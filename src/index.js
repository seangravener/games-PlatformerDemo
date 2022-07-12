import Phaser from "phaser";
import config from "./config";
import GameScene from "./scenes/GameScene";
import PlayerDemoScene from "./scenes/PlayerDemoScene";

new Phaser.Game({ ...config, ...{ scene: [PlayerDemoScene] } });
