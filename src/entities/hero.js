import { GameObjects } from "phaser";

const baseUnit = 250;
const _velocity = {
  walk: baseUnit / 1.6,
  run: baseUnit,
  left: baseUnit * -1,
  right: baseUnit,
  drag: 400,
  accelRate: baseUnit * 4,
  max: { x: baseUnit, y: baseUnit * 2 },
};
class Hero extends GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "hero-run_png");
    this.init(scene);

    this.anims.play("hero-running");
  }

  init(scene) {
    this.scene = scene;

    this.initScene();
    this.initPhysicsBody();
    this.initCursorKeys();
  }

  initPhysicsBody() {
    // Set this sprite-body to interact with other objects
    this.body.setCollideWorldBounds(true);

    // Center this sprite-body collision boundery with offsets
    this.body.setSize(12, 40); // w, h
    this.body.setOffset(12, 23);

    // Set movement velocity limits
    const { drag, max } = _velocity;
    this.body.setMaxVelocity(max.x, max.y);
    // this.body.setDragX(drag);
  }

  initScene() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
  }

  initCursorKeys() {
    this.cursorKeys = this.scene.cursorKeys;
  }

  preUpdate(...args) {
    super.preUpdate(...args);

    if (this.cursorKeys.left.isDown) {
      // this.body.setVelocityX(_velocity.left);
      this.body.setAccelerationX(_velocity.accelRate * -1);
      this.body.offset.x = 8; // Center collision boundry with offset
      this.setFlipX(true);
    }

    //
    else if (this.cursorKeys.right.isDown) {
      // this.body.setVelocityX(_velocity.right);
      this.body.setAccelerationX(_velocity.accelRate);
      this.body.offset.x = 12; // Center collision boundry with offset
      this.setFlipX(false);
    }

    //
    else {
      this.body.setVelocityX(0);
    }
  }
}

export default Hero;
