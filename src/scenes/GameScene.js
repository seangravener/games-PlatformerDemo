import Phaser, { Scene } from "phaser";
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
    // Using Phaser input manager
    this.input.keyboard.on("keydown-SPACE", () => {
      console.log("space pressed");
    });

    this.space = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.space.on("up", () => {
      console.log("released space");
    });

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

  update(time, delta) {
    if (this.space.isDown) {
      console.log("holding space");
    }
  }
}

export default GameScene;
