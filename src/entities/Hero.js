import Phaser from "phaser";

class Hero extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "hero-run-sheet", 0);
    // this.player = this.physics.add.sprite(250, 130, "hero-run-sheet");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.anims.play("hero-running");

    // set collision rectangle size and offset
    this.body.setCollideWorldBounds(true).setSize(12, 40).setOffset(12, 23);

    this.keys = scene.cursorKeys;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.keys.left.isDown) {
      this.body.setVelocityX(-250);
      this.setFlipX(true);
      
      // Adjust offset of collision rectangle:
      // [total width of Sprite] - [Width of collision rectangle] - [orig width of offset] = offset.x
      this.body.offset.x = 8;
    
    } else if (this.keys.right.isDown) {
      this.body.setVelocityX(250);
      this.setFlipX(false);
      this.body.offset.x = 12;
    } else {
      this.body.setVelocityX(0);
    }
  }
}

export default Hero;
