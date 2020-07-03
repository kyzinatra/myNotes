import { isSave, settings } from "../settings";

export function save() {
	const openRequest = indexedDB.open("Editor", 1);
	openRequest.onupgradeneeded = () => needUpgrade(openRequest);
	openRequest.onsuccess = () => initSave(openRequest);
}

export function load() {
	const openRequest = indexedDB.open("Editor", 1);
	openRequest.onupgradeneeded = () => needUpgrade(openRequest);
	openRequest.onsuccess = () => initLoad(openRequest);
}

function needUpgrade(request) {
	const DataBase = request.result;
	switch (0) {
		case 0:
			DataBase.createObjectStore("Editor", { keyPath: "id" });
			break;
	}
}

function initSave(request) {
	const transaction = request.result.transaction("Editor", "readwrite");
	const DataBase = transaction.objectStore("Editor");
	DataBase.clear();
	const editor = document.querySelector(".area");
	const content = editor.innerHTML;
	const addRequest = DataBase.add({ content: content, id: 0, settings });
	isSave.state = true;
}

function initLoad(request) {
	const transaction = request.result.transaction("Editor", "readonly");
	const content = transaction.objectStore("Editor");
	const inner = content.getAll();
	inner.onsuccess = () => {
		settings.spellcheck = inner.result[0].settings.spellcheck ?? true;
		const spellcheckItem = document.querySelectorAll("#spellcheck .select li");
		const area = document.querySelector(".area");

		for (let el of spellcheckItem) {
			if (el.dataset.value == "" + settings.spellcheck) el.classList.add("selected");
			else el.classList.remove("selected");
		}
		area.setAttribute("spellcheck", settings.spellcheck);
		area.innerHTML = inner.result[0].content || "";
	};
}
