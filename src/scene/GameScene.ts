import { Scene } from "phaser"
import { World, Position } from "../objetcs/World"
import { Bird } from "../objetcs/Bird"
import { Button } from "../objetcs/Button"
import { Pig } from "../objetcs/Pig"

export class GameScene extends Scene {

    private world: World
    private bird: Bird
    private pig: Pig
    private launchButton: Button
    private resetButton: Button
    private setCoefficientButton: Button
    // private setBirdCoordinateButton: Button
    // private setPigCoordinateButton: Button
    private setBirdAndPig:Button

    private elementBirdX: HTMLInputElement
    private elementBirdY: HTMLInputElement
    private elementPigX: HTMLInputElement
    private elementPigY: HTMLInputElement
    private elementA: HTMLInputElement
    private elementB: HTMLInputElement
    private elementC: HTMLInputElement

    constructor() {
        super()
    }

    init() {
        this.world = new World(this, this.sys.game.config.height as number, this.sys.game.config.width as number)
    }

    preload() {
        this.load.pack('preload', './assets/pack.json', 'preload')
        this.load.bitmapFont("MarioFont", "assets/superMarioLand.png", "assets/superMarioLand.fnt")
    }

    create() {

        // background
        const backGround = this.add.image(0, 0, "BackGround").setOrigin(0)
        const scaleFactorX: number = this.sys.game.config.width as number / backGround.width
        const scaleFactorY: number = this.sys.game.config.height as number / backGround.height
        backGround.setScale(scaleFactorX, scaleFactorY).setDepth(0)

        // 2D Grid
        this.world.visualizeWorld()

        // bird
        const birdPos = this.world.mapPosition(new Position(-14, -8))
        this.bird = new Bird(this, birdPos.x, birdPos.y, "RedBird").setDepth(9)

        // pig
        const pigPos = this.world.mapPosition(new Position(0, 0))
        this.pig = new Pig(this, pigPos.x, pigPos.y, "Pig").setDepth(9)

        this.setupUI()
        this.setupInput()

        this.physics.add.collider(this.bird, this.pig, () => {
            this.pig.alpha = 0
        }, undefined, this)
    }


    setupUI() {
        this.launchButton = new Button(this, 240, 155, "Play", () => {
            if (this.world.getPath().length > 0) {

                this.bird.path = this.world.getPath()
                this.bird.move()
                this.bird.isLaunched = true
            }
        })

        this.resetButton = new Button(this, 95, 155, "Restart", () => {
            this.bird.isLaunched = false
            this.world.clearGraph()
            this.bird.reset()
            this.resetInput()
            this.pig.alpha = 1
        })

        this.setCoefficientButton = new Button(this, 360, 105, "Play", () => {
            const a = parseFloat(this.elementA.value)
            const b = parseFloat(this.elementB.value)
            const c = parseFloat(this.elementC.value)
            this.world.clearGraph()
            this.world.drawQuadraticFunction(a, b, c)
        })

        // this.setBirdCoordinateButton = new Button(this, 180, 60, "Levels", () => {
        //     const birdX = parseFloat(this.elementBirdX.value)
        //     const birdY = parseFloat(this.elementBirdY.value)
        //     const newPos = this.world.mapPosition(new Position(birdX, birdY))
        //     this.bird.setPosition(newPos.x, newPos.y)
        // })

        // this.setPigCoordinateButton = new Button(this, 420, 60, "Levels", () => {
        //     const pigX = parseFloat(this.elementPigX.value)
        //     const pigY = parseFloat(this.elementPigY.value)
        //     const newPos = this.world.mapPosition(new Position(pigX, pigY))
        //     this.pig.setPosition(newPos.x, newPos.y)
        // })

        this.setBirdAndPig = new Button(this, 530, 50, "Levels", () => {
            const birdX = parseFloat(this.elementBirdX.value)
            const birdY = parseFloat(this.elementBirdY.value)
            const newPosBird = this.world.mapPosition(new Position(birdX, birdY))
            const pigX = parseFloat(this.elementPigX.value)
            const pigY = parseFloat(this.elementPigY.value)
            const newPosPig = this.world.mapPosition(new Position(pigX, pigY))
            this.bird.setPosition(newPosBird.x, newPosBird.y)
            this.pig.setPosition(newPosPig.x, newPosPig.y)
        })

        this.add.bitmapText(10, 15, "MarioFont", "Bird Coordinate", 12)
        this.add.bitmapText(240, 15, "MarioFont", "Pig Coordinate", 12)
        this.add.bitmapText(450, 15, "MarioFont", "Set Position", 12)
        this.add.bitmapText(150, 150, "MarioFont", "Launch", 12)
        this.add.bitmapText(20, 150, "MarioFont", "Reset", 12)

        this.add.bitmapText(60, 95, "MarioFont", "X2", 20)
        this.add.bitmapText(150, 95, "MarioFont", "X", 20)
        this.add.bitmapText(230, 100, "MarioFont", "ShowGraph", 12)
    }

    setupInput() {
        this.elementBirdX = document.getElementById('birdX') as HTMLInputElement
        this.elementBirdY = document.getElementById('birdY') as HTMLInputElement
        this.elementPigX = document.getElementById('pigX') as HTMLInputElement
        this.elementPigY = document.getElementById('pigY') as HTMLInputElement

        this.elementA = document.getElementById('CoeffA') as HTMLInputElement
        this.elementB = document.getElementById('CoeffB') as HTMLInputElement
        this.elementC = document.getElementById('CoeffC') as HTMLInputElement
    }

    resetInput() {
        this.elementBirdX.value = ''
        this.elementBirdY.value = ''
        this.elementPigX.value = ''
        this.elementPigY.value = ''

        this.elementA.value = ''
        this.elementB.value = ''
        this.elementC.value = ''

    }

}
