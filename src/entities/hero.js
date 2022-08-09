import { GameObjects, Input } from "phaser";
import StateMachine from "javascript-state-machine";

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
    this.input = {};
  }

  init(scene) {
    this.scene = scene;

    this.initScene();
    this.initPhysicsBody();
    this.initCursorKeys();
    this.setupMovement();
  }

  initPhysicsBody() {
    // Set this sprite-body to interact with other objects
    this.body.setCollideWorldBounds(true);

    // Center this sprite-body collision boundary with offsets
    this.body.setSize(12, 40); // w, h
    this.body.setOffset(12, 23);

    // Set movement velocity limits
    const { drag, max } = _velocity;
    this.body.setMaxVelocity(max.x, max.y);
    this.body.setDragX(drag);

    this.canDoubleJump = false;
  }

  initScene() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
  }

  initCursorKeys() {
    this.cursorKeys = this.scene.cursorKeys;
  }

  setupMovement() {
    this.moveState = new StateMachine({
      init: "standing",
      transitions: [
        { name: "jump", from: "standing", to: "jumping" },
        { name: "flip", from: "jumping", to: "flipping" },
        { name: "fall", from: "standing", to: "falling" },
        {
          name: "touchdown",
          from: ["standing", "flipping", "falling"],
          to: "standing",
        },
      ],

      methods: {
        onJump: () => {
          this.body.setVelocityY(-_velocity.jump);
        },
        onFlip: () => {
          this.body.setVelocity(-300);
        },
      },
    });

    // In what condition(s) can transition be made?
    this.movePredicates = {
      jump: () => this.input.didPressJump,
      flip: () => this.input.didPressJump,
      fall: () => !this.body.onFloor(),
      touchdown: () => this.body.onFloor(),
    };

    console.log(this.moveState.transitions());
  }

  preUpdate(...args) {
    super.preUpdate(...args);

    if (this.cursorKeys.left.isDown) {
      // this.body.setVelocityX(_velocity.left);
      this.body.setAccelerationX(-_velocity.accelRate);
      this.body.offset.x = 8; // Center collision boundary with offset
      this.setFlipX(true);
    }

    //
    else if (this.cursorKeys.right.isDown) {
      // this.body.setVelocityX(_velocity.right);
      this.body.setAccelerationX(_velocity.accelRate);
      this.body.offset.x = 12; // Center collision boundary with offset
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

    const isJumping = up.isDown || space.isDown || velocityY > 0;
    this.input.didPressJump =
      Input.Keyboard.JustDown(this.cursorKeys.up) ||
      Input.Keyboard.JustDown(this.cursorKeys.space);

    // Method 1: Bounce effect if key is held down
    // if (isJumping && onFloor) {
    //   this.body.setVelocityY(-_velocity.jump);
    // }

    // Method 2: One jump per jump
    // if (didPressJump && onFloor) {
    //   this.body.setVelocityY(-_velocity.jump);
    // }

    // Method 3: Double jump
    // if (this.input.didPressJump) {
    //   if (onFloor) {
    //     this.canDoubleJump = true;
    //     this.body.setVelocityY(-_velocity.jump);
    //   } else if (this.canDoubleJump) {
    //     this.canDoubleJump = false;
    //     this.body.setVelocityY(-_velocity.jump - 100);
    //   } else if (!onFloor) {
    //     this.canDoubleJump = false;
    //   }
    // }

    // # Deceleration
    // When jump is pressed and released before velocityY reaches
    // its max (a negative value), reset velocityY to decelerate jumping
    if (this.moveState.is("jumping") || this.moveState.is("flipping"))
      if (!isJumping && velocityY < -_velocity.decelRate) {
        this.body.setVelocityY(-_velocity.decelRate);
      }
    // Ask state machine which transition are currently valid, loop through them
    for (const t of this.moveState.transitions() && this.movePredicates[t]()) {
      console.log(t);
      // eg. this.moveState.jump()
      this.moveState[t]();
      break;
    }
  }
}

export default Hero;
