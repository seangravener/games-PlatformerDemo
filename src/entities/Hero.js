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
    this.body.setMaxVelocity(250, 400);
    this.body.setDragX(750);

    this.keys = scene.cursorKeys;
  }

  // Update animations
  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.keys.left.isDown) {
      this.body.setAccelerationX(-1000);
      this.setFlipX(true);

      // Adjust offset of collision rectangle:
      // [total width of Sprite] - [Width of collision rectangle] - [orig width of offset] = offset.x
      this.body.offset.x = 8;
    }

    // Right Key
    else if (this.keys.right.isDown) {
      this.body.setAccelerationX(1000);
      this.setFlipX(false);

      // Reset collision offset
      this.body.offset.x = 12;
    }

    // No Key
    else {
      // this.body.setVelocityX(0);
      this.body.setAccelerationX(0);
    }

    const didPressJump = Phaser.Input.Keyboard.JustDown(this.keys.up);
    if (didPressJump) {
      if (this.body.onFloor()) {
        this.candDoubleJump = true;
        this.body.setVelocityY(-400);
      } else if (this.candDoubleJump) {
        this.candDoubleJump = false;
        this.body.setVelocityY(-300);
      }
    }

    if (!this.keys.up.isDown && this.body.velocity.y < -150) {
      this.body.velocity.y = -150;
    }
  }
}

export default Hero;
