export class Button extends Phaser.GameObjects.Container {
    public sprite: Phaser.GameObjects.Image
    private isPointerDown: boolean
    private isPointerOver: boolean
    private callback: () => void

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        spriteKey: string,
        callback: () => void
    ) {
        super(scene, x, y)

        this.callback = callback
        this.isPointerDown = false
        this.isPointerOver = false
        this.sprite = this.scene.add.image(0, 0, spriteKey)
        this.add(this.sprite)

        this.setInteractive(
            new Phaser.Geom.Rectangle(
                -this.sprite.width / 2,
                -this.sprite.height / 2,
                this.sprite.width,
                this.sprite.height
            ),
            Phaser.Geom.Rectangle.Contains
        )

        this.on('pointerdown', this.onButtonDown, this)
        this.on('pointerup', this.onButtonUp, this)
        this.on('pointerover', this.onButtonOver, this)
        this.on('pointerout', this.onButtonOut, this)

        scene.add.existing(this)
    }

    private onButtonDown() {
        this.isPointerDown = true
    }

    private onButtonUp() {
        if (this.isPointerDown) {
            this.isPointerDown = false
            this.callback()
        }
    }

    private onButtonOver() {
        this.isPointerOver = true
    }

    private onButtonOut() {
        this.isPointerOver = false
    }
}