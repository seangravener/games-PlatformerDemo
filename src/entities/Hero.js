import { GameObjects, Input } from "phaser";
import StateMachine from "javascript-state-machine";
import Actor from "./Actor";

const MOVE_STATE = {
  init: "standing",
  transitions: [
    { name: "jump", from: "standing", to: "jumping" },
    { name: "flip", from: "jumping", to: "flipping" },
    { name: "fall", from: "standing", to: "falling" },
    {
      name: "touchdown",
      from: ["jumping", "flipping", "falling"],
      to: "standing",
    },
  ],
};

const ANIM_STATE = {
  init: "idle",
  transitions: [
    { name: "idle", from: ["falling", "running", "pivoting"], to: "idle" },
    { name: "run", from: ["falling", "idle", "pivoting"], to: "running" },
    { name: "pivot", from: ["falling", "running"], to: "pivoting" },
    { name: "jump", from: ["idle", "running", "pivoting"], to: "jumping" },
    { name: "flip", from: ["jumping", "falling"], to: "flipping" },
    {
      name: "fall",
      from: ["idle", "running", "pivoting", "jumping", "flipping"],
      to: "falling",
    },
  ],
};

class Hero extends Actor {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.cursorKeys = scene.cursorKeys;
    this.input = {};

    this.setupBounds();
    this.setupMovement();
    this.setupAnimations();
  }

  setupBounds() {
    this.body.setCollideWorldBounds(true).setSize(12, 40).setOffset(12, 23);
  }

  setupMovement() {
    const METHODS = {
      onJump: () => this.body.setVelocityY(-400),
      onFlip: () => this.body.setVelocityY(-300),
      onEnterState: (lifecycle) => console.log("moveState: ", lifecycle.to),
    };

    const MOVE_PREDICATES = {
      jump: () => this.input.didPressJump,
      flip: () => this.input.didPressJump,
      fall: () => !this.body.onFloor(),
      touchdown: () => this.body.onFloor(),
    };

    this.body.setMaxVelocity(250, 400);
    this.body.setDragX(750);

    this.movePredicates = MOVE_PREDICATES;
    this.moveState = new StateMachine({ ...MOVE_STATE, methods: METHODS });
  }

  setupAnimations() {
    const ANIM_PREDICATES = {
      idle: () => this.body.onFloor() && this.body.velocity.x === 0,
      run: () =>
        this.body.onFloor() &&
        Math.sign(this.body.velocity.x) === (this.flipX ? -1 : 1),
      pivot: () =>
        this.body.onFloor() &&
        Math.sign(this.body.velocity.x) === (this.flipX ? 1 : -1),
      jump: () => this.body.velocity.y < 0,
      flip: () => this.body.velocity.y < 0 && this.moveState.is("flipping"),
      fall: () => this.body.velocity.y > 0,
    };

    const METHODS = {
      onEnterState: (lifecycle) => {
        this.anims.play(`hero-${lifecycle.to}`);
        console.log("animState: ", `hero-${lifecycle.to}`);
      },
    };

    this.animPredicates = ANIM_PREDICATES;
    this.animState = new StateMachine({ ...ANIM_STATE, methods: METHODS });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    
    this.input.didPressJump = Input.Keyboard.JustDown(this.cursorKeys.up);

    if (this.cursorKeys.left.isDown) {
      this.body.setAccelerationX(-1000);
      this.setFlipX(true);

      // Adjust offset of collision rectangle:
      // [total width of Sprite] - [Width of collision rectangle] - [orig width of offset] = offset.x
      this.body.offset.x = 8;
    } else if (this.cursorKeys.right.isDown) {
      this.body.setAccelerationX(1000);
      this.setFlipX(false);
      this.body.offset.x = 12;
    } else {
      this.body.setAccelerationX(0);
    }

    // Reduce jump velocity
    if (this.moveState.is("jumping") || this.moveState.is("flipping")) {
      if (!this.cursorKeys.up.isDown && this.body.velocity.y < -150) {
        this.body.setVelocityY(-150);
      }
    }

    for (const t of this.moveState.transitions()) {
      if (t in this.movePredicates && this.movePredicates[t]()) {
        console.log("moveState transition: ", t);
        this.moveState[t]();
        break;
      }
    }

    for (const t of this.animState.transitions()) {
      // valid transition?
      if (t in this.animPredicates && this.animPredicates[t]()) {
        console.log("animState transition: ", t);
        this.animState[t]();
        break;
      }
    }
  }
}

export default Hero;
