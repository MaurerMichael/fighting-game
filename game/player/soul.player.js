export class SoulPlayer {

    gravity = 0.7
    height = 150
    width = 50
    velocity = {x: 0, y: 0}
    keyMap = {}

    constructor(canvas, context, startPosition, keyBindings) {
        this.canvas = canvas
        this.ctx = context
        this.position = {x: startPosition, y: this.canvas.height - this.height}
        keyBindings.forEach(binding => this.keyBinding(binding))
        console.log(this.keyMap, this.position)
    }

    draw() {
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.gravityCheck()
        this.borderCheck()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

    gravityCheck() {
        if ((this.position.y + this.height + this.velocity.y) >= this.canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += this.gravity
    }

    borderCheck() {
        if((this.position.x + this.width + this.velocity.x) >= this.canvas.width || (this.position.x + this.velocity.x) <= 0 ) {
            this.velocity.x = 0
        }
    }

    keyBinding(binding) {
        switch (binding.action) {
            case "moveLeft":
                Object.assign(this.keyMap, {
                    [binding.key]: {
                        keyPress: () => this.moveLeft(),
                        keyUp: () => this.velocity.x = 0,
                        keyActive: false
                    }
                })
                break
            case "moveRight":
                Object.assign(this.keyMap, {
                    [binding.key]: {
                        keyPress: () => this.moveRight(),
                        keyUp: () => this.velocity.x = 0,
                        keyActive: false
                    }
                })
                break
            case "jump":
                Object.assign(this.keyMap, {
                    [binding.key]: {
                        keyPress: () => this.jump(),
                        keyActive: false
                    }
                })
                break
            default:
                return
        }
    }

    keyPress(key) {
        const actionEvent = this.keyMap[key]
        if (actionEvent && actionEvent.keyPress) {
            actionEvent.keyPress()
            actionEvent.keyActive = true
        }
    }

    keyUp(key) {
        const actionEvent = this.keyMap[key]
        if (actionEvent && actionEvent.keyUp) {
            actionEvent.keyUp()
            actionEvent.keyActive = false
        }
    }

    moveLeft() {
        this.velocity.x -= 1
    }

    moveRight() {
        this.velocity.x += 1
    }

    jump() {
        this.velocity.y -= 20
    }
}