import { GameObjects } from "phaser";

class Hero extends GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "hero-run_png");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Create .player reference to sprite game object
    // this.player = scene.add.sprite(400, 300, "hero-run_png");
    // Use this.physics to add sprite with physics body
    this.body.setCollideWorldBounds(true);
    this.body.setSize(12, 40); // w, h
    this.body.setOffset(12, 23);
    this.anims.play("hero-running");

    // // Add sprite frame to scene
    // scene.add.image(100, 100, "hero-run_png"); // as static frame
    // this.add.sprite(400, 400, "hero-run_png"); // as animation
    // this.add.sprite(424, 400, "hero-run_png", 2);
    // this.add.sprite(448, 400, "hero-run_png", 3);
  }
}

export default Hero;
