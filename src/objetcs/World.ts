
export class World {
    public worldHeight: number
    public worldWidth: number
    public worldCenter: { x: number, y: number }

    private scene: Phaser.Scene

    private gridSize = 40
    private tickOffset = 5
    private unitXOffset = 20
    private unitYOffset = 7.5

    private path: { x: number, y: number }[] = []
    private graphics: Phaser.GameObjects.Graphics
    private graphicsGraph: Phaser.GameObjects.Graphics


    constructor(scene: Phaser.Scene, height: number, width: number) {
        this.scene = scene
        this.worldHeight = height
        this.worldWidth = width
        this.worldCenter = { x: this.worldHeight / 2, y: this.worldWidth / 2 }
        this.graphics = this.scene.add.graphics().setDepth(10)
    }


    visualizeWorld(): void {

        for (let x = this.worldWidth; x > 0; x -= this.gridSize) {
            this.graphics.lineStyle(
                0.5,
                0x000000,
                0.1
            )
            this.graphics.moveTo(x, 0)
            this.graphics.lineTo(x, this.worldHeight)
        }

        for (let x = this.worldHeight; x > 0; x -= this.gridSize) {
            this.graphics.lineStyle(
                0.5,
                0x000000,
                0.1
            )
            this.graphics.moveTo(0, x)
            this.graphics.lineTo(this.worldWidth, x)
            this.graphics.strokePath()
        }
        // Draw the X-axis
        this.graphics.lineStyle(2, 0x000000, 1)
        this.graphics.moveTo(0, this.worldHeight / 2)
        this.graphics.lineTo(this.worldWidth, this.worldHeight / 2)

        // Draw the Y-axis
        this.graphics.moveTo(this.worldWidth / 2, 0)
        this.graphics.lineTo(this.worldWidth / 2, this.worldHeight)
        this.graphics.strokePath()


        // Draw ticks on the X-axis
        let counter = 0
        for (let x = this.worldWidth / 2; x < this.worldWidth; x += this.gridSize) {
            this.graphics.lineBetween(x, this.worldHeight / 2 - this.tickOffset, x, this.worldHeight / 2 + this.tickOffset)

            if (counter != 0) {
                this.scene.add.text(x - this.tickOffset, this.worldHeight / 2 - this.unitXOffset, counter.toString(), { color: "0x000000" })
            }
            counter += 1
        }

        counter = 0
        for (let x = this.worldWidth / 2; x > -this.worldWidth; x -= this.gridSize) {
            this.graphics.lineBetween(x, this.worldHeight / 2 - 5, x, this.worldHeight / 2 + 5)

            if (counter != 0) {
                this.scene.add.text(x - this.tickOffset, this.worldHeight / 2 - this.unitXOffset, '-' + counter.toString(), { color: "0x000000" })
            }
            counter += 1
        }

        // Draw ticks on the Y-axis
        counter = 0
        for (let y = this.worldHeight / 2; y < this.worldHeight; y += this.gridSize) {
            this.graphics.lineBetween(this.worldWidth / 2 - this.tickOffset, y, this.worldWidth / 2 + this.tickOffset, y)

            if (counter != 0) {
                this.scene.add.text(this.worldWidth / 2 + this.tickOffset * 2, y - this.unitYOffset, '-' + counter.toString(), { color: "0x000000" })
            }
            counter += 1
        }

        counter = 0
        for (let y = this.worldHeight / 2; y > -this.worldHeight; y -= this.gridSize) {
            this.graphics.lineBetween(this.worldWidth / 2 - this.tickOffset, y, this.worldWidth / 2 + this.tickOffset, y)

            if (counter != 0) {
                this.scene.add.text(this.worldWidth / 2 + this.tickOffset * 2, y - this.unitYOffset, counter.toString(), { color: "0x000000" })
            }
            counter += 1
        }

        this.graphics.strokePath()



    }


    drawQuadraticFunction(a: number, b: number, c: number) {
        this.graphicsGraph = this.scene.add.graphics()
        this.graphicsGraph.lineStyle(2, 0xff0000, 1)

        for (let x = -16; x <= 16; x += 0.1) {
            const y = this.getQuadraticY(x, a, b, c) * this.gridSize
            this.path.push(new Position(this.worldCenter.y + x * this.gridSize, this.worldCenter.x - y))
            this.graphicsGraph.lineTo(this.worldCenter.y + x * this.gridSize, this.worldCenter.x - y)
        }

        this.graphicsGraph.strokePath()
    }


    private getQuadraticY(x: number, a: number, b: number, c: number): number {
        return a * x * x + b * x + c
    }

    public mapPosition(pos: Position): Position {
        return new Position(this.worldCenter.y + pos.x * this.gridSize, this.worldCenter.x - pos.y * this.gridSize)
    }

    public getPath(): { x: number, y: number }[] {
        return this.path.filter(point => {
            return point.x <= this.worldWidth && point.x > 0 && point.y <= this.worldHeight && point.y > 0
        })
    }

    public clearGraph() {
        if (this.graphicsGraph)
            this.graphicsGraph.clear()
        this.path = []
    }
}

export class Position {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}