import { Scene } from "phaser";

class GameScene extends Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.spritesheet("hero-run_png", "assets/hero/run.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  create() {
    this.add.sprite(400, 300, "hero-run_png");
    this.add.sprite(424, 300, "hero-run_png", 2);
    this.add.sprite(448, 300, "hero-run_png", 3);
  }

  update(time, delta) {}
}

export default GameScene;
