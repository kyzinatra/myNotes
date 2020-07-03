class Select {
	isOpen = null;
	isColorMenuOpen = false;
	init() {
		const selects_titles = document.querySelectorAll(".select__title");
		const selects = document.querySelectorAll(".select");
		for (let select__title of selects_titles) {
			select__title.addEventListener("click", e => this.onToggleSelect(e, this));
		}
		for (let select of selects) {
			select.addEventListener("click", e => this.onSelectItem(e, this));
		}
		document.addEventListener("click", e => this.cleanAllSelection(e, this));
	}
	onToggleSelect(event, self) {
		let target = event.target.closest(".select__title").nextSibling;
		if (!target) return;

		function closeSelects() {
			const selects = document.querySelectorAll(".select");
			for (let el of selects) el.style.display = "none";
			self.isOpen = null;
		}

		if (self.isOpen === target) return closeSelects();
		if (self.isOpen) closeSelects();
		target.style.display = "block";
		self.isOpen = target;
	}

	cleanAllSelection(event, self) {
		const target = event.target.closest(".select");
		const soTarget = event.target.closest(".select__title");
		if (self.isColorMenuOpen || self.isColorMenuOpen === "CLOSED") {
			self.isColorMenuOpen = false;
			return;
		}
		if (target || soTarget || !self.isOpen) return;
		const selects = document.querySelectorAll(".select");
		for (let el of selects) el.style.display = "none";
		self.isOpen = null;
	}

	onSelectItem(event, self) {
		const target = event.target.closest("li");
		const nonselective = event.target.closest(".select__nonselective");
		if (nonselective) {
			nonselective.style.display = "none";
			self.isOpen = null;
			return;
		}
		if (!target || !target.closest(".select")) return;
		function cleanSelect(target) {
			const items = target.querySelectorAll(".selected");
			for (let item of items) {
				item.classList.remove("selected");
			}
		}
		cleanSelect(target.closest(".select"));
		target.classList.add("selected");
	}
}

const selectManager = new Select();
selectManager.init();
export { selectManager };
