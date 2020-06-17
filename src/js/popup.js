/** @format */
export class Popup {
  isover = false;
  isTimeOut = false;
  event = [];
  PopupMouseover(e) {
    const unTarget = e.target.closest(".select");
    const target = e.target.closest(".nav__item");
    if (unTarget || !target) return;
    const test = this.event[0]?.dataset.popup === target.dataset.popup;
    if (test) {
      this.showPopup(this.event);
      return;
    }

    this.event = [target, e];
    if (!this.isover) {
      this.isover = true;
      this.isTimeOut = true;
      setTimeout(() => {
        this.isTimeOut = false;
        if (this.isover) this.showPopup(this.event);
      }, 600);
    }
  }
  showPopup(target) {
    if (!target) return;
    const popupContent = target[0].dataset.popup || "";
    const popup = document.getElementById("popup");
    popup.textContent = popupContent;
    popup.style.display = "block";
    popup.style.top = 40 + "px";
    popup.style.left = target[1].clientX - 40 + "px";
  }
  deletePopup() {
    this.event = [];
    popup.style.display = "none";
  }
  PopupMouseout(e) {
    this.isover = false;
    this.deletePopup();
  }
  setPopup() {
    const nav = document.querySelector(".nav");
    const list = document.querySelectorAll(".popup");
    for (let el of list) {
      el.addEventListener("mouseover", (e) => this.PopupMouseover(e));
      el.addEventListener("mouseout", (e) => this.PopupMouseout(e));
    }
  }
}
new Popup().setPopup();
