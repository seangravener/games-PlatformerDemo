import { Plugins } from "phaser";

const _defaultConfig = {
  speed: 3,
  border: {
    thickness: 3,
    color: 0x907748,
    alpha: 1,
  },
  window: {
    alpha: 0.8,
    color: 0x303030,
    height: 150,
  },
};

export class DialogPlugin extends Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);
    this.scene = scene;
  }

  init(config = _defaultConfig) {
    // this.grid = new GridLayout(height, width, baseUnit = 8)
    // this.ui = new shapeUI()
    // const {x,y} = this.grid.lowerThirds() // return coords when no params; set object to coords
    // this.background = this.drawBox(x, y, height, width, options)

    // Dialog box should "grow", with text starting on the bottom,
    // moving to the line above. The current line is always the
    // most-bottom line.

    this.scene.graphics = this.scene.add.graphics();
    this.createInnerWindow();

    this.scene.add.image(350, 400, "hero-run_png");
    this.scene.icon = this.scene.add.image(400, 100, "hero-icon_png");
    this.scene.icon.setOrigin(0, 0);
    this.scene.icon.scale = 2;
  }

  boot() {
    console.log(this.scene);
    // this.init()
    const eventEmitter = this.systems.events;
    eventEmitter.on("shutdown", this.shutdown, this);
    eventEmitter.on("destroy", this.destroy, this);
  }

  createInnerWindow() {
    // this.scene.graphics.fillStyle(this.windowColor, 0.3);
    // this.scene.graphics.fillRect(200, 200, 450, 200);
    // this.scene.graphics.fillRect(200, 200, 550, 250);

    // this.scene.graphics.fillStyle(this.windowColor, 0.5);
    // this.scene.graphics.fillRoundedRect(100, 10, 200, 50, 4);
    const graphics = this.scene.graphics;

    // graphics.lineStyle(5, 0xff00ff, 1.0);
    // graphics.beginPath();
    // graphics.moveTo(300, 100);
    // graphics.lineTo(200, 200);
    // graphics.closePath();
    // graphics.strokePath();

    // graphics.lineStyle(4, 0x00011, 1);
    // graphics.fillStyle(0xefefef, 0.4);
    // graphics.fillRect(50, 50, 400, 200);
    // graphics.strokeRect(50, 50, 400, 200);
    // graphics.strokeRect(58, 58, 400, 200);

    // graphics.setRotation(45)

    // this.scene.graphics.strokeRoundedRect(100, 10, 200, 50, 4);

    // this.scene.graphics.fillStyle(this.windowColor, 1);
    // this.scene.graphics.fillRoundedRect(150, 50, 200, 50, 4);
    // this.scene.graphics.strokeRoundedRect(150, 50, 200, 50, 4);

    // var r1 = this.scene.add.rectangle(200, 200, 148, 148, 0x6666ff);
    // var r2 = this.scene.add.rectangle(400, 200, 148, 148, 0x9966ff);
    // r2.setStrokeStyle(4, 0xefc53f);
    // var r3 = this.scene.add.rectangle(600, 200, 148, 148);
    // r3.setStrokeStyle(2, 0x1a65ac);
    // var r4 = this.scene.add.rectangle(200, 400, 148, 148, 0xff6699);
    // var r5 = this.scene.add.rectangle(400, 400, 148, 148, 0xff33cc);
    // var r6 = this.scene.add.rectangle(600, 400, 148, 148, 0xff66ff);
  }

  // Gets the width of the game (based on the scene)
  _getGameWidth() {
    return this.scene.sys.game.config.width;
  }
  // Gets the height of the game (based on the scene)
  _getGameHeight() {
    return this.scene.sys.game.config.height;
  }

  shutdown() {}

  // called when a Scene is destroyed by the Scene Manager
  destroy() {
    this.shutdown();
    this.scene = undefined;
  }
}
