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
    // Create animation
    this.anims.create({
      key: "hero-running",

      // generates array of frames; can be config'd per frame
      frames: this.anims.generateFrameNumbers("hero-run_png"),
      frameRate: 10, // every 10th of second (10 miliseconds)
      repeat: -1,
    });

    // Create .player reference to sprite game object
    this.player = this.add.sprite(400, 300, "hero-run_png");
    this.player.anims.play("hero-running");

    // Add sprite frame to scene
    this.add.image(400, 400, "hero-run_png"); // as static frame
    this.add.sprite(400, 400, "hero-run_png"); // as animation
    this.add.sprite(424, 400, "hero-run_png", 2);
    this.add.sprite(448, 400, "hero-run_png", 3);
  }

  update(time, delta) {}
}

export default GameScene;
