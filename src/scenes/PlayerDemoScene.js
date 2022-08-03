import { Scene } from "phaser";

class PlayerDemoScene extends Scene {
  constructor() {
    super({ key: "PlayerDemoScene" });
  }

  preload() {
    this.load.image("hero-icon_png", "assets/hero/icon2.png");
    this.load.spritesheet("hero-run_png", "assets/hero/run.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  create() {
    this.createPlayerAnimations();
    this.createPlayerDemos();

    this.plugins.get("DialogPlugin");
    console.log(this.dialog);
    this.dialog.init();

    const dialog1 = {
      icon: "face2",
      text: "Hello. I am Juilette, the main player in this game.",
    };
    // this.dialog.create(dialog1)
    // this.dialog.show(id)
    // this.dialog.hide(id)
  }

  createPlayerAnimations() {
    this.anims.create({
      key: "hero-running",

      // generates array of frames; can be config'd per frame
      frames: this.anims.generateFrameNumbers("hero-run_png"),
      frameRate: 10,
      repeat: -1,
    });
  }

  createPlayerDemos() {
    // Add a sprite frame to scene
    this.showAllPlayerFrames();

    this.player = this.add.sprite(300, 350, "hero-run_png");
    this.player.scale = 2;
    this.player.anims.play("hero-running");

    // add as physics body
    this.player2 = this.physics.add.sprite(300, 350, "hero-run_png");
    this.player2.body.setCollideWorldBounds(true);
  }

  showAllPlayerFrames() {
    // as static image or frame

    const baseUnit = 8;
    const padding = baseUnit * 2;
    const position = { x: 32, y: 32 };
    for (let frame in this.anims.generateFrameNumbers("hero-run_png")) {
      position.y = position.y + 32 + padding;
      this.add.sprite(position.x, position.y, "hero-run_png", frame.frame);
    }

    // as animagted sprites
    this.add.sprite(100, 450, "hero-run_png").anims.play("hero-running");
  }

  update(time, delta) {}
}

export default PlayerDemoScene;
