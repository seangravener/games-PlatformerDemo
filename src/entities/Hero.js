import Phaser from "phaser";
import StateMachine from "javascript-state-machine";

class Hero extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "hero-run-sheet", 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.anims.play("hero-running");

    // set collision rectangle size and offset
    this.body.setCollideWorldBounds(true).setSize(12, 40).setOffset(12, 23);
    this.body.setMaxVelocity(250, 400);
    this.body.setDragX(750);

    this.keys = scene.cursorKeys;
    this.input = {};
    this.setupMovement();
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
          from: ["jumping", "flipping", "falling"], // also accepts * as wildcard
          to: "standing",
        },
      ],
      methods: {
        // onEnterJumping: () => {},
        onJump: () => {
          this.body.setVelocityY(-400);
        },
        onFlip: () => {
          this.body.setVelocityY(-300);
        },
        onEnterState: (lifecycle) => {
          console.log(lifecycle);
        },
      },
    });

    this.movePredicates = {
      jump: () => this.input.didPressJump,
      flip: () => this.input.didPressJump,
      fall: () => !this.body.onFloor(),
      touchdown: () => this.body.onFloor(),
    };
  }

  // Update sprite animations
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.input.didPressJump = Phaser.Input.Keyboard.JustDown(this.keys.up);

    if (this.keys.left.isDown) {
      this.body.setAccelerationX(-1000);
      this.setFlipX(true);

      // Adjust offset of collision rectangle:
      // [total width of Sprite] - [Width of collision rectangle] - [orig width of offset] = offset.x
      this.body.offset.x = 8;
    } else if (this.keys.right.isDown) {
      this.body.setAccelerationX(1000);
      this.setFlipX(false);
      this.body.offset.x = 12;
    } else {
      this.body.setAccelerationX(0);
    }

    // Reduce jump velocity
    if (this.moveState.is("jumping") || this.moveState.is("flipping")) {
      if (!this.keys.up.isDown && this.body.velocity.y < -150) {
        this.body.setVelocityY(-150);
      }
    }

    for (const t of this.moveState.transitions()) {
      if (t in this.movePredicates && this.movePredicates[t]()) {
        this.moveState[t]();
        break;
      }
    }
  }
}

export default Hero;
