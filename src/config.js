import Phaser from "phaser";
import { DialogPlugin } from "./scenes/DialogPlugin";

export default {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#33A5E7",
  scale: {
    width: 800,
    height: 600,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    pixelArt: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 750 },
      debug: false,
      debugShowVelocity: true,
      debugShowBody: true,
      debugShowStaticBody: true,
    },
  },
  plugins: {
    scene: [
      {
        key: "DialogPlugin",
        plugin: DialogPlugin,
        mapping: "dialog",
      },
    ],
  },
};
