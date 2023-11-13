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
    private setBirdCoordinateButton: Button
    private setPigCoordinateButton: Button

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
    }



    setupUI() {
        this.launchButton = new Button(this, 100, 145, "Play", () => {
            if (this.world.getPath().length > 0) {

                this.bird.path = this.world.getPath()
                this.bird.move()
                this.bird.isLaunched = true
            }
        })

        this.resetButton = new Button(this, 260, 145, "Restart", () => {
            this.bird.isLaunched = false
            this.world.clearGraph()
            this.bird.reset()
            this.resetInput()
        })

        this.setCoefficientButton = new Button(this, 380, 100, "Play", () => {
            const a = parseFloat(this.elementA.value)
            const b = parseFloat(this.elementB.value)
            const c = parseFloat(this.elementC.value)
            this.world.clearGraph()
            this.world.drawQuadraticFunction(a, b, c)
        })

        this.setBirdCoordinateButton = new Button(this, 180, 60, "Levels", () => {
            const birdX = parseFloat(this.elementBirdX.value)
            const birdY = parseFloat(this.elementBirdY.value)
            const newPos = this.world.mapPosition(new Position(birdX, birdY))
            this.bird.setPosition(newPos.x, newPos.y)
        })

        this.setPigCoordinateButton = new Button(this, 420, 60, "Levels", () => {
            const pigX = parseFloat(this.elementPigX.value)
            const pigY = parseFloat(this.elementPigY.value)
            const newPos = this.world.mapPosition(new Position(pigX, pigY))
            this.pig.setPosition(newPos.x, newPos.y)
        })

        this.add.bitmapText(10, 15, "MarioFont", "Bird Coordinate", 12)
        this.add.bitmapText(250, 15, "MarioFont", "Pig Coordinate", 12)
        this.add.bitmapText(10, 140, "MarioFont", "Launch", 12)
        this.add.bitmapText(170, 140, "MarioFont", "Reset", 12)

        this.add.bitmapText(10, 95, "MarioFont", "A", 20)
        this.add.bitmapText(130, 95, "MarioFont", "B", 20)
        this.add.bitmapText(250, 95, "MarioFont", "C", 20)
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
