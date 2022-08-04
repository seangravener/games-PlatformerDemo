import { GameObjects } from "phaser";

class Hero extends GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "hero-run_png");
    this.addtoScene(scene);
    this.keys = scene.cursorKeys;

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

  addtoScene(scene) {
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  preUpdate(...args) {
    super.preUpdate(...args);
    const vel = {
      left: -250,
      right: 250,
    };

    if (this.keys.left.isDown) {
      this.body.setVelocityX(vel.left);
      this.setFlipX(true);
      this.body.offset.x = 8;
    } else if (this.keys.right.isDown) {
      this.body.setVelocityX(vel.right);
      this.setFlipX(false);
      this.body.offset.x = 12;
    } else {
      this.body.setVelocityX(0);
    }
  }
}

export default Hero;
