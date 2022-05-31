import { GameObjects, Input } from "phaser";
import StateMachine from "javascript-state-machine";

class Actor extends GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "hero-run-sheet", 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }
}

export default Actor;
