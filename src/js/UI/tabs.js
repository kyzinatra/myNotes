class TabManager {
	__init__() {
		const tabs = document.querySelectorAll("[data-for]");
		for (let tab of tabs) {
			tab.addEventListener("click", e => {
				const target = e.target.closest("h2");
				if (!target) return;
				const openItem = document.querySelector(target.dataset.for);
				const active = document.querySelectorAll(".tab__active");
				const active_titles = document.querySelectorAll(".tab__active-item");
				for (let el of active) {
					el.classList.remove("tab__active");
				}
				for (let el of active_titles) {
					el.classList.remove("tab__active-item");
				}
				target.classList.add("tab__active-item");
				openItem.classList.add("tab__active");
			});
		}
	}
}
new TabManager().__init__();
