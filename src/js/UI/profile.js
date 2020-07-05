// profileSelect

const profileEl = document.getElementById("profileSelect");

class Profile {
	addEl = profileEl.querySelector("#profileAdd");
	select = profileEl.querySelector(".select");
	__init__() {
		this.addEl.addEventListener("click", e => this.onAddElement(e));
		profileEl.addEventListener("click", e => this.onProfileClick(e));
	}
	onProfileClick(e) {
		e.stopPropagation();
		const editTarget = e.target.closest(".profileEdit");
		const delTarget = e.target.closest(".profileDelete");
		if (editTarget) {
			this.setEdit(editTarget);
		}
		if (delTarget) {
			this.deleteItem(delTarget);
		}
	}
	deleteItem(target) {
		target.closest("li").parentNode.removeChild(target.closest("li"));
	}
	setEdit(target) {
		const el = target.closest("li");
		el.innerHTML = `<input type="text">`;

		const input = el.querySelector("input");
		input.focus();

		input.onkeydown = e => {
			if (e.keyCode === 27 || e.keyCode === 13) {
				input.blur();
			}
		};

		input.onblur = e => {
			input.keydown = null;
			el.innerHTML =
				input.value +
				`<i class="far fa-edit profileEdit"></i><i class="far fa-trash-alt profileDelete"></i>`;
		};
	}
	onAddElement(e) {
		const newProfile = document.createElement("li");
		newProfile.innerHTML = `<input type="text">`;
		newProfile.classList = "profileEl";
		this.select.append(newProfile);
		this.select.append(this.addEl);
		const input = newProfile.querySelector("input");
		input.focus();

		input.onkeydown = e => {
			if (e.keyCode === 27 || e.keyCode === 13) {
				input.blur();
			}
		};

		input.onblur = e => {
			input.keydown = null;
			newProfile.innerHTML =
				input.value +
				`<i class="far fa-edit profileEdit"></i><i class="far fa-trash-alt profileDelete"></i>`;
		};
	}
}
new Profile().__init__();
