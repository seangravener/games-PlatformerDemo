import { GameObjects, Input } from "phaser";

const baseUnit = 250;
const _velocity = {
  walk: baseUnit / 1.6,
  run: baseUnit,
  left: baseUnit * -1,
  right: baseUnit,
  jump: 400,
  drag: 400,
  accelRate: baseUnit * 4,
  decelRate: 150,
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
    this.body.setDragX(drag);
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
      this.body.setAccelerationX(-_velocity.accelRate);
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
      this.body.setAccelerationX(0);
    }

    const [onFloor, velocityY, up, space] = [
      this.body.onFloor(),
      this.body.velocity.y,
      this.cursorKeys.up,
      this.cursorKeys.space,
    ];

    const isJumping = up.isDown || space.isDown;
    const didPressJump =
      Input.Keyboard.JustDown(this.cursorKeys.up) ||
      Input.Keyboard.JustDown(this.cursorKeys.space);

    // Method 1: Produces bounce effect if key is held down
    // if (isJumping && onFloor) {
    //   this.body.setVelocityY(-_velocity.jump);
    // }

    // Method 2: Produces one jump per press (while onFloor)
    if (didPressJump && this.body.onFloor()) {
      this.body.setVelocityY(-_velocity.jump);
    }

    // # Deceleration
    // When jump is pressed and released before velocityY reaches 
    // its max (a negative value), reset velocityY to decelerate jumping
    if (!isJumping && velocityY < -_velocity.decelRate) {
      this.body.setVelocityY(-_velocity.decelRate);
    }
  }
}

export default Hero;
