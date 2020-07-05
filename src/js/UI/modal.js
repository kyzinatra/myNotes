const { paintManager } = require("../paint/paint");

const close = document.querySelectorAll(".close");
const openLink = document.querySelector("#addLink");
const openSprite = document.querySelector("#addSprite");
const modal = document.querySelector(".modal");
const area = document.querySelector(".area");

const createSprite = document.querySelector(".createSprite");
const createLink = document.querySelector(".createLink");

let isOpen = false;
//? Open
openLink.addEventListener("click", e => {
	modal.classList.add("modal_open");
	createLink.style.display = "block";
	isOpen = true;
});
openSprite.addEventListener("click", e => {
	modal.classList.add("modal_open");
	createSprite.style.display = "block";
	isOpen = true;
	paintManager.resize();
});

//? close on backend or esc click
modal.addEventListener("click", e => {
	if (!isOpen) return;
	if (e.target.closest(".modal__content")) return;
	modalClose();
});
document.addEventListener("keyup", e => {
	if (e.keyCode == 27 && isOpen) {
		const confirm = window.confirm("Закрыть модальное окно?\nВнесенные изменения не сохраняться");
		if (confirm) modalClose();
	}
});

//? Close
for (let el of close) {
	const inputs = modal.querySelectorAll("input");
	for (input of inputs) {
		input.innerHTML = "";
	}
	el.addEventListener("click", e => {
		modalClose();
	});
}

function modalClose() {
	modal.classList.remove("modal_open");
	createSprite.style.display = "none";
	createLink.style.display = "none";
	isOpen = false;
	area.focus();
}
