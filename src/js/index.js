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
	console.log(e);
	console.log(e.target);
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
