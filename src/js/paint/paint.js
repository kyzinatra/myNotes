import { selectManager } from "../UI/select";

const cavas = document.getElementById("paint");

class PaintManager {
	width = 10;
	color = "#000000";
	tool = "brush";
	isErase = false;
	is_mouse_down = false;
	canvas = cavas;
	ctx = cavas.getContext("2d");
	resize() {
		const pos = this.canvas.getBoundingClientRect();
		console.log(pos);
		this.canvas.width = pos.width;
		this.canvas.height = pos.height;
	}
	__init__() {
		const pos = this.canvas.getBoundingClientRect();
		this.canvas.width = pos.width;
		this.canvas.height = pos.height;
		this.canvas.addEventListener("mousedown", (e, self) => {
			this.is_mouse_down = true;
			this.ctx.beginPath();
		});

		this.canvas.addEventListener("mouseup", e => {
			this.is_mouse_down = false;
		});

		this.canvas.addEventListener("mousemove", e => {
			if (this.is_mouse_down && !selectManager.isColorMenuOpen) {
				if (this.isErase) {
					this.ctx.fillStyle = "white";
					this.ctx.strokeStyle = "white";
				} else {
					this.ctx.fillStyle = this.color;
					this.ctx.strokeStyle = this.color;
				}

				this.ctx.lineWidth = this.width;

				this.ctx.lineTo(e.offsetX, e.offsetY);
				this.ctx.stroke();

				this.ctx.beginPath();
				this.ctx.arc(e.offsetX, e.offsetY, this.width / 2, 0, Math.PI * 2);
				this.ctx.fill();

				this.ctx.beginPath();
				this.ctx.moveTo(e.offsetX, e.offsetY);
			}
		});
	}

	clear() {
		this.ctx.clearRect(0, 0, canv.width, canv.height);
	}
}
const paintManager = new PaintManager();
paintManager.__init__();
export { paintManager };
