export class SimpleBackground {

    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx
    }

    fillBackground() {
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(0,0, this.canvas.width,this.canvas.height)
    }
}
