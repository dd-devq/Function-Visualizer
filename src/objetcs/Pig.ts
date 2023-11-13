import { Position } from "./World"


export class Pig extends Phaser.Physics.Arcade.Sprite {

    public worldPos: Position

    constructor(scene: Phaser.Scene, x: number, y: number, spriteKey: string) {
        super(scene, x, y, spriteKey)
        this.setScale(0.25)
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)
        if (this.body !== null) {
            this.body
                .setSize(
                    this.width * 0.2,
                    this.height * 0.2
                )
        }
    }

}