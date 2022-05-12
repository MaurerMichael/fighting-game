export class SimpleBackground {

    groundLevel = 0

    position = {
        x: 0,
        y: 0
    }

    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx
        this.height = canvas.height
        this.width = canvas.width
    }

    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0,0, this.canvas.width,this.canvas.height)
    }

    update() {
        this.draw()
    }
}
