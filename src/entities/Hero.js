import Phaser from "phaser";

class Hero extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "hero-run-sheet", 0);
    // this.player = this.physics.add.sprite(250, 130, "hero-run-sheet");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.anims.play("hero-running");

    // set collision rectangle
    this.body.setCollideWorldBounds(true).setSize(12, 40).setOffset(12, 23);
  }
}

export default Hero;
