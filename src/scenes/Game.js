import Phaser from "phaser";

// game object factory
class Game extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  init(data) {}

  preload() {
    this.load.spritesheet("hero-run-sheet", "assets/hero/run.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  create(data) {
    this.add.sprite(400, 300, "hero-run-sheet", 3);
  }

  // game loop
  update(time, delta) {}
}

export default Game;
