import { selectManager } from "./select";

(function () {
	const inputs = document.querySelectorAll(".color__input-font, .color__input-color");
	for (let input of inputs) {
		input.addEventListener("click", e => (selectManager.isColorMenuOpen = true));
		input.addEventListener("blur", e => {
			selectManager.isColorMenuOpen = "CLOSED";
			const target = e.target.closest(".color__input-color");
			const soTarget = e.target.closest(".color__input-font");
			if (target) {
				document.dispatchEvent(
					new CustomEvent("nav-event", {
						detail: { type: "color", value: target.value },
					})
				);
			}
			if (soTarget) {
				document.dispatchEvent(
					new CustomEvent("nav-event", {
						detail: { type: "back-color", value: soTarget.value },
					})
				);
			}
		});
		input.addEventListener("input", e => {
			const target = e.target.closest(".color__input-color");
			const soTarget = e.target.closest(".color__input-font");
			const titles = document.querySelectorAll(".color__title");

			if (target) {
				for (let el of titles) {
					el.style.color = target.value;
				}
			}
			if (soTarget) {
				for (let el of titles) {
					el.style.backgroundColor = soTarget.value;
				}
			}
		});
	}
})();
