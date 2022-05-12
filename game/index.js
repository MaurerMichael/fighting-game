import {SimpleBackground} from "./background/simple.background.js";
import {SoulPlayer} from "./player/soul.player.js";
import {GID, POKB, PTKB} from "./default.conf.js";
import {collision} from "./physics/collision.js";
import {StartScreen} from "./screens/start.screen.js";
import {EndScreen} from "./screens/end.screen.js";
import {WoodBackground} from "./background/wood/wood.background.js";


export class Game {

    poKeyBindings = POKB
    ptKeyBindings = PTKB

    time = 180

    constructor(height, width) {
        this.canvas = document.createElement("canvas")
        this.canvas.width = width
        this.canvas.height = height
        this.context = this.canvas.getContext("2d")
        this.gameContainer = document.createElement("div")
        this.gameContainer.id = GID
        this.gameContainer.style.width = `${width}px`
        this.gameContainer.style.height = `${height}px`
        this.gameContainer.style.position = "relative"

        document.body.appendChild(this.gameContainer)
    }

    init() {
        this.activeBackground = new SimpleBackground(this.canvas, this.context)
        this.healthbar = document.createElement("div")
        this.healthbar.id = "health-bar"
        this.timer = document.createElement("div")
        this.timer.className = "timer"
        this.countdown()

        this.gameContainer.appendChild(this.canvas)

        this.screen = new StartScreen(this)
        this.screen.show()

        window.addEventListener("keypress", (event) => {
            event.preventDefault()
            if (this.activeGame && this.time > 0 && !!this.playerOne && !!this.playerTwo) {
                this.playerOne.keyPress(event.key)
                this.playerTwo.keyPress(event.key)
            }
        })

        window.addEventListener("keyup", (event) => {
            event.preventDefault()
            if (this.activeGame &&this.time > 0 && !!this.playerOne && !!this.playerTwo) {
                this.playerOne.keyUp(event.key)
                this.playerTwo.keyUp(event.key)
            }
        })
    }

    start() {
        this.activeGame = true
        this.activeBackground = new WoodBackground(this.canvas, this.context)
        this.healthbar.innerHTML = ""
        this.playerOne = new SoulPlayer(this.canvas, this.context, this.canvas.width * 0.1, this.poKeyBindings, 'green', false, this.activeBackground.groundLevel)
        this.healthbar.appendChild(this.playerOne.healthbar)

        this.healthbar.appendChild(this.timer)

        this.playerTwo = new SoulPlayer(this.canvas, this.context, this.canvas.width * 0.9, this.ptKeyBindings, 'blue', true, this.activeBackground.groundLevel)
        this.healthbar.appendChild(this.playerTwo.healthbar)

        this.gameContainer.appendChild(this.healthbar)

        this.interval = setInterval(() => {
            if (this.time > 0) --this.time
            else {

                this.endGame()
            }
            this.countdown()
        }, 1000)

        this.animate()
    }

    animate() {
        window.requestAnimationFrame(() => this.animate())
        this.activeBackground.update()

        if (!!this.playerOne && !!this.playerTwo) {
            this.playerOne.update()
            this.playerTwo.update()

            if (this.playerOne.isAttacking && collision(this.playerOne.attackBox, this.playerTwo)) {
                this.playerOne.isAttacking = false
                this.playerTwo.currentHealth -= 10
            }

            if (this.playerTwo.isAttacking && collision(this.playerTwo.attackBox, this.playerOne)) {
                this.playerTwo.isAttacking = false
                this.playerOne.currentHealth -= 10
            }

            if (this.activeGame && (this.playerOne.currentHealth <= 0 || this.playerTwo.currentHealth <= 0) && this.interval) {
                this.endGame()
            }
        }
    }

    countdown() {
        const minutes = Math.floor(this.time / 60)
        const seconds = this.time - minutes * 60
        this.timer.innerText = `0${minutes}:${seconds < 10 ? `0${seconds}`: seconds}`
    }

    endGame() {
        this.activeGame = false
        this.playerOne.update()
        this.playerTwo.update()
        clearInterval(this.interval)
        let message = ""
        if(this.playerOne.currentHealth === this.playerTwo.currentHealth){
            message = "Draw"
        }else if (this.playerOne.currentHealth < this.playerTwo.currentHealth){
            message = "Player Two win"
        }else if(this.playerOne.currentHealth> this.playerTwo.currentHealth){
            message = "Player One win"
        }
        this.screen = new EndScreen(this, message)
        this.screen.show()
    }
}

