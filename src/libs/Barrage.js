export default class Barrage {
  constructor(item, ctx) {
    this.value = item.value;
    this.time = item.time;
    this.item = item;
    this.ctx = ctx;
  }

  init() {
    this.opacity = this.item.opacity || this.ctx.opacity;
    this.color = this.item.color || this.ctx.color;
    this.fontSize = this.item.fontSize || this.ctx.fontSize;
    this.speed = this.item.speed || this.ctx.speed;

    let span = document.createElement("span");

    span.innerText = this.value;
    span.style.font = this.fontSize + "px";

    span.style.position = "absolute";

    document.body.appendChild(span);
    this.width = span.clientWidth;
    document.body.removeChild(span);

    this.x = this.ctx.canvas.width;
    this.y = Math.floor(Math.random() * this.ctx.canvas.height);

    if (this.y < this.fontSize) {
      this.y = this.fontSize;
    }

    if (this.y > this.ctx.canvas.height - this.fontSize) {
      this.y = this.ctx.canvas.height - this.fontSize;
    }
  }

  render() {
    this.ctx.context.font = this.fontSize + "px";
    this.ctx.context.fillStyle = this.color;
    this.ctx.context.fillText(this.value, this.x, this.y);
  }
}
