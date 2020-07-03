/** @format */

import "./events/events";
import "./UI/select";
import "./UI/tabs";
import "./UI/color";
import "./events/eventListenters";
import "./UI/modal";
import { save, load } from "./technical/save-load";
import { isSave, settings } from "./settings";
import { toggleArea } from "./technical/area";

let isCtrl = false;
let isAlt = false;
const area = document.querySelector(".area");
window.onbeforeunload = function () {
	if (!isSave.state) {
		save();
		return false;
	}
};

window.addEventListener("load", e => {
	load();
});

area.setAttribute("spellcheck", settings.spellcheck);

area.addEventListener("input", e => {
	if (isSave.state) {
		document.title = "Notes (not saved)";
		isSave.state = false;
	}
});

document.addEventListener("click", e => {
	if (isAlt && e.target.tagName === "A") {
		window.open(e.target.href, "_blank");
		window.focus();
		e.preventDefault();
	}
});

document.addEventListener("keyup", e => {
	if (e.keyCode == 17) isCtrl = false;
	if (e.keyCode == 18) {
		isAlt = false;
		toggleArea(isAlt);
	}
});

document.addEventListener("keydown", e => {
	if (e.keyCode == 18 && !isAlt) {
		isAlt = true;
		toggleArea(isAlt);
	}
	if (e.keyCode == 17 && !isCtrl) isCtrl = true;
	if (e.keyCode == 83 && isCtrl === true) {
		save();
		e.preventDefault();
		isSave.state = true;
		document.title = "Notes";
		return false;
	}
});

document.addEventListener("scroll", e => {
	const scrollHeight = Math.max(
		document.body.scrollHeight,
		document.documentElement.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.offsetHeight,
		document.body.clientHeight,
		document.documentElement.clientHeight
	);
	const bodyHeight = Math.ceil(window.pageYOffset + document.documentElement.offsetHeight);
	if (bodyHeight + 35 >= scrollHeight) {
		area.style.height = area.scrollHeight + 35 + "px";
	}
});
