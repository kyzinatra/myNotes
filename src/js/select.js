/** @format */
class Select {
  isOpened = false;
  openSelect(e, selects) {
    const target = e.target.closest(".nav__item")?.querySelector(".select");
    if (!target) return;

    if (target.style.display === "block") {
      this.isOpened = false;
      target.style.display = "none";
      return;
    }
    for (let select of selects) {
      select.style.display = "none";
    }
    this.isOpened = true;
    target.style.display = "block";
  }

  loseFocus(e, selects) {
    const target = e.target.closest(".nav__item");
    if (target || !this.isOpened) return;
    for (let select of selects) {
      select.style.display = "none";
    }
  }
  newSelect(e, selecteble) {
    const target = e.target.closest("li");

    if (
      !e.target.closest(".select") ||
      !e.target.closest(".selecteble") ||
      e.target.closest(".font-color-select")
    ) {
      return;
    }
    console.log(e.target.closest(".font-color-select"));
    for (let item of e.target.closest(".select").querySelectorAll("li")) {
      item.classList.remove("selected");
    }
    target.classList.add("selected");
  }
  setSelect() {
    const selects = document.querySelectorAll(".select");
    const nav = document.querySelector(".nav");
    const selecteble = document.querySelectorAll(".selecteble");

    nav.addEventListener("click", (e) => this.openSelect(e, selects));
    nav.addEventListener("click", (e) => this.newSelect(e, selecteble));
    document.addEventListener("click", (e) => this.loseFocus(e, selects));
    for (let select of selects) {
      select.style.display = "none";
    }
  }
}
const select = new Select();
select.setSelect();

import colors from "../static/colors.json";

function colorSelect() {
  const select = document.querySelector(".select.font-color-select");
  select.addEventListener("click", (e) => {
    const target = e.target.closest(".color");
    console.log(target);
    if (!target) return;
    for (let el of select.querySelectorAll("div")) {
      el.classList.remove("selected-color");
    }
    target.classList.add("selected-color");
  });
  let fragment = new DocumentFragment();
  for (let color of colors.list) {
    const container = document.createElement("div");
    container.classList = "color";
    if (color === "#101010") {
      container.classList = "color selected-color";
    }
    container.style.backgroundColor = color;
    fragment.append(container);
  }
  select.append(fragment);
}
colorSelect();
