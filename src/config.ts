import { GameScene } from "./scene/GameScene"

export const GameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Function Visualizer',
    version: '1.0',
    type: Phaser.AUTO,
    width: 1280,
    height: 720,

    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: false,
            fps: 60,
        },
    },
    backgroundColor: "#CBC3E3",
    scene: [GameScene],
    render: { pixelArt: false, antialias: true },
}

