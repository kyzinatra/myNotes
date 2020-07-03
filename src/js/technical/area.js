export function toggleArea(state) {
	const area = document.querySelector(".area");
	if (state) {
		area.removeAttribute("contenteditable");
	} else {
		area.setAttribute("contenteditable", "true");
		area.focus();
	}
}
