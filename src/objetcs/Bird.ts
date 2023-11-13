import { Position } from "./World"

export class Bird extends Phaser.Physics.Arcade.Sprite {

    public worldPos: Position

    public movement: Phaser.Tweens.BaseTween

    public path: { x: number, y: number }[] = []

    public isLaunched = false

    public defaultPos: Position

    constructor(scene: Phaser.Scene, x: number, y: number, spriteKey: string) {
        super(scene, x, y, spriteKey)
        this.setScale(0.4)
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)

        this.defaultPos = new Position(x, y)

        if (this.body !== null) {
            this.body
                .setSize(
                    this.width * 0.2,
                    this.height * 0.2
                )
        }
    }


    move() {
        if (!this.isLaunched) {

            this.scene.add.tween({
                targets: this,
                x: this.path[0].x,
                y: this.path[0].y,
                duration: 2000,
                ease: 'sine.inout',
                onComplete: () => {
                    for (let i = 1; i < this.path.length; i++) {
                        this.movement = this.scene.add.tween({
                            targets: this,
                            x: this.path[i].x,
                            y: this.path[i].y,
                            duration: 50,
                            ease: 'sine.inout',
                            delay: i * 50,
                            onCompleteScope: this
                        })
                    }

                },
                onCompleteScope: this
            })

        }
    }

    reset() {
        this.x = this.defaultPos.x
        this.y = this.defaultPos.y
        this.path = []
    }
}