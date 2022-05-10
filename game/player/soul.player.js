export class SoulPlayer {

    gravity = 0.7
    height = 150
    width = 50
    velocity = {x: 0, y: 0}
    keyMap = {}
    health = 100
    currentHealth = 100

    constructor(canvas, context, startPosition, keyBindings, color, rightCorner) {
        this.canvas = canvas
        this.ctx = context
        this.position = {x: rightCorner ? startPosition - this.width : startPosition, y: this.canvas.height - this.height}
        this.color = color
        keyBindings.forEach(binding => this.keyBinding(binding))
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: {
                x: rightCorner ? 120 - this.width : 0,
                y: 0
            },
            height: 40,
            width: 120
        }
        this.healthbar = document.createElement("div")
        this.healthview = document.createElement("div")
        this.healthview.style.width = "100%"
        this.healthbar.appendChild(this.healthview)

        console.log(this.keyMap, this.position)
    }

    draw() {
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        if(this.isAttacking){
            this.ctx.fillStyle = 'red'
            this.ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y - this.attackBox.offset.y
        this.healthview.style.width = `${100 / this.health * this.currentHealth}%`
        this.gravityCheck()
        this.borderCheck()
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
            case "attack":
                Object.assign(this.keyMap, {
                    [binding.key]: {
                        keyPress: () => this.attack(),
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
        this.attackBox.offset.x = this.attackBox.width - this.width
    }

    moveRight() {
        this.velocity.x += 1
        this.attackBox.offset.x = 0
    }

    jump() {
        if(this.velocity.y === 0){
            this.velocity.y -= 20
        }
    }

    attack() {
        this.isAttacking = true
        setTimeout(()=> this.isAttacking = false, 100)
    }
}