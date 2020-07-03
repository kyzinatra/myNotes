const close = document.querySelectorAll(".close");
const open = document.querySelector("#addLink");
const modal = document.querySelector(".modal");

open.addEventListener("click", e => modal.classList.add("modal_open"));

for (let el of close) {
	el.addEventListener("click", e => modal.classList.remove("modal_open"));
}
