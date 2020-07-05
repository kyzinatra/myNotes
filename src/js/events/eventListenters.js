const { paintManager } = require("../paint/paint");
const { selectManager } = require("../UI/select");

const listenters = [
	"bold",
	"italic",
	"underline",
	"lineThrough",
	"delete",
	"clean",
	"undo",
	"redo",
	"horizontal",
	"save",
	"copyHTML",
	"createLink",
	"spriteClean",
	"spriteErase",
	"spriteFill",
	"imgCreate",
];

for (let el of listenters) {
	document.querySelector(`#${el}`).addEventListener("click", () => {
		document.dispatchEvent(
			new CustomEvent("nav-event", {
				detail: { type: el },
			})
		);
	});
}

const selectListenters = [
	"spellcheck",
	"align",
	"list",
	"font-size",
	"font-family",
	"dent",
	"heading",
	"spriteSize",
];

for (let el of selectListenters) {
	const items = document.querySelectorAll(`#${el} .select li`);
	for (let item of items) {
		item.addEventListener("click", function (e) {
			document.dispatchEvent(
				new CustomEvent("nav-event", {
					detail: { type: el, value: this.dataset.value },
				})
			);
		});
	}
}

document.querySelector(".image-file").oninput = e => {
	console.log(e.target.files[0]);
	const reader = new FileReader();
	reader.readAsDataURL(e.target.files[0]);
	reader.onload = e => {
		console.log(reader.result);
		document.dispatchEvent(
			new CustomEvent("nav-event", {
				detail: { type: "image", value: reader.result },
			})
		);
	};
};

const paintColor = document.querySelector("#spriteColor input");
paintColor.addEventListener("change", e => {
	const target = e.target.closest("input[type='color']");
	if (!target) return;
	paintManager.color = target.value;
});
paintColor.addEventListener("blur", e => (selectManager.isColorMenuOpen = "CLOSED"));
paintColor.addEventListener("click", e => (selectManager.isColorMenuOpen = true));
