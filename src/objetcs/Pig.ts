import { Position } from "./World"


export class Pig extends Phaser.GameObjects.Sprite {

    public worldPos: Position

    constructor(scene: Phaser.Scene, x: number, y: number, spriteKey: string) {
        super(scene, x, y, spriteKey)
        this.setScale(0.25)
        this.scene.add.existing(this)
    }

}