import Engine from "./engine";
import * as okee from "@okee-uikit/render";

class OKeeEngine extends Engine {
  constructor() {
    super();

    const container = document.createElement("div");
    this.content.appendChild(container);
    this.app = new okee.Render(container, {dpr: 1});
    this.app.enableDirtyRect = false;
    this.app.resize(this.width, this.height)
    this.rects = [];
  }

  onTick() {
    const rectsToRemove = [];

    for (let i = 0; i < this.count.value; i++) {
      const rect = this.rects[i];
      rect.x -= rect.speed;
      rect.el.setAttr("x", rect.x);
      if (rect.x + rect.size < 0) rectsToRemove.push(i);
    }

    rectsToRemove.forEach((i) => {
      this.rects[i].x = this.width + this.rects[i].size / 2;
    });

    this.meter.tick();
    this.request = requestAnimationFrame(() => this.onTick());
  }

  render() {
    this.app.clear();
    this.cancelAnimationFrame(this.request);
    this.rects = [];
    for (let i = 0; i < this.count.value; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      const size = 10 + Math.random() * 40;
      const speed = 1 + Math.random();

      const rect = new okee.Rect({
          x,
          y,
          width: size,
          height: size,
          fill: "white",
          stroke: "black",
      });
      this.app.add(rect);
      this.rects[i] = { x, y, size, speed, el: rect };
    }
    this.request = requestAnimationFrame(() => this.onTick());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const engine = new OKeeEngine();
  engine.render();
});
