import { Scene } from "phaser";
import Hero from "../entities/hero";

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
    // Create animation
    this.anims.create({
      key: "hero-running",

      // generates array of frames; can be config'd per frame
      frames: this.anims.generateFrameNumbers("hero-run_png"),
      frameRate: 10, // every 10th of second (10 miliseconds)
      repeat: -1,
    });

    this.hero = new Hero(this, 250, 160);
  }

  update(time, delta) {}
}

export default GameScene;
