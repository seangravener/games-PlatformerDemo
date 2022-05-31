import Phaser from "phaser";
import Hero from "../entities/Hero";

// game object factory
class Game extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  init(data) {}

  preload() {
    // this.load.tilemapTiledJSON("level-1", "assets/tiles/level-0.json");
    // this.load.tilemapTiledJSON("level-1", "assets/tiles/level-1.json");
    this.load.tilemapTiledJSON("level-1", "assets/tiles/level-00.json");

    this.load.image("world-1-sheet", "assets/tiles/world-1.png");
    this.load.image("clouds-sheet", "assets/tiles/clouds.png");

    this.load.spritesheet("hero-idle-sheet", "assets/hero/idle.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-run-sheet", "assets/hero/run.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-pivot-sheet", "assets/hero/pivot.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-jump-sheet", "assets/hero/jump.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-flip-sheet", "assets/hero/spinjump.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-fall-sheet", "assets/hero/fall.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  create(data) {
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.space = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.space.on("up", () => {
      console.log("Release Space");
    });

    this.anims.create({
      key: "hero-idle",
      frames: this.anims.generateFrameNumbers("hero-idle-sheet"),
    });

    this.anims.create({
      key: "hero-running",
      frames: this.anims.generateFrameNumbers("hero-run-sheet"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "hero-pivoting",
      frames: this.anims.generateFrameNumbers("hero-pivot-sheet"),
    });

    this.anims.create({
      key: "hero-jumping",
      frames: this.anims.generateFrameNumbers("hero-jump-sheet"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "hero-flipping",
      frames: this.anims.generateFrameNumbers("hero-flip-sheet"),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: "hero-falling",
      frames: this.anims.generateFrameNumbers("hero-fall-sheet"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "hero-dead",
      frames: this.anims.generateFrameNumbers("hero-die-sheet"),
    });

    this.addMap();
    this.addHero();
    this.initMainCamera();
    this.addPlatforms();
  }

  addHero() {
    this.hero = new Hero(this, 250, 160);

    // Reorder layers to place Foreground above Hero
    this.children.moveTo(
      this.hero,
      this.children.getIndex(this.map.getLayer("Foreground").tilemapLayer)
    );

    const groundCollider = this.physics.add.collider(
      this.hero,
      this.map.getLayer("Ground").tilemapLayer
    );
  }

  initMainCamera() {
    const coords = [0, 0],
      bounds = [this.map.widthInPixels, this.map.heightInPixels];

    this.cameras.main.setBounds(...coords, ...bounds);
    this.cameras.main.startFollow(this.hero);
  }

  addPlatforms() {
    const platform = this.add.rectangle(220, 240, 300, 20, 0x4bcb7c);
    this.physics.add.existing(platform, true);
    this.physics.add.collider(this.hero, platform);

    const platform2 = this.add.rectangle(220, 130, 160, 20, 0x4bcb7c);
    this.physics.add.existing(platform2, true);
    this.physics.add.collider(this.hero, platform2);

    const platform3 = this.add.rectangle(380, 180, 60, 20, 0x4bcb7c);
    this.physics.add.existing(platform3, true);
    this.physics.add.collider(this.hero, platform3);
  }

  addMap() {
    this.map = this.make.tilemap({ key: "level-1" });
    const groundTiles = this.map.addTilesetImage("world-1", "world-1-sheet");
    const backgroundTiles = this.map.addTilesetImage("clouds", "clouds-sheet");
    const groundLayer = this.map.createStaticLayer("Ground", groundTiles);
    groundLayer.setCollisionBetween(0, 32);

    const backgroundLayer = this.map.createStaticLayer(
      "Background",
      backgroundTiles
    );

    // const platformTiles = this.map.addTilesetImage("world-1", "world-1-sheet");
    this.map.createStaticLayer("Platforms", groundTiles);
    this.map.createStaticLayer("Foreground", groundTiles);
    // platformLayer.setCollisionBetween(0, 32);

    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.physics.world.setBoundsCollision(true, true, false, true);

    // debug tilemaps
    // const debugGraphics = this.add.graphics();
    // groundLayer.renderDebug(debugGraphics);
  }

  // game loop
  update(time, delta) {
    if (this.cursorKeys.space.isDown) {
      console.log("Holding Space");
    }
  }
}

export default Game;
