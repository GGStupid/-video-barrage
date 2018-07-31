import Barrage from "./Barrage";

export default class CanvasBarrage {
  constructor(canvas, video, options = {}) {
    if (!canvas || !video) return;
    this.canvas = canvas;
    this.video = video;

    this.canvas.width = video.clientWidth;
    this.canvas.height = video.clientHeight;

    this.isPaused = true;

    let defaultOptions = {
      fontSize: 20,
      color: "gold",
      speed: 2,
      opacity: 0.3,
      data: []
    };

    Object.assign(this, defaultOptions, options);

    this.barrages = this.data.map(item => new Barrage(item, this));

    this.context = canvas.getContext("2d");

    this.render();
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderBarrage();

    if (this.isPaused === false) {
      requestAnimationFrame(this.render.bind(this));
    }
  }

  renderBarrage() {
    let time = this.video.currentTime;

    this.barrages.forEach(barrage => {
      if (!barrage.flag && time >= barrage.time) {
        if (!barrage.isInited) {
          barrage.init();
          barrage.isInited = true;
        }

        barrage.x -= barrage.speed;
        barrage.render();
        if (barrage.x < barrage.width * -1) {
          barrage.flag = true;
        }
      }
    });
  }

  add(item) {
    this.barrages.push(new Barrage(item, this));
  }

  reset() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let time = this.video.currentTime;

    this.barrages.forEach(barrage => {
      barrage.flag = false;
      if (time <= barrage.time) {
        barrage.isInited = false;
      } else {
        barrage.flag = true;
      }
    });
  }
}
