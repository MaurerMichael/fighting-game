import {SimpleBackground} from "./background/simple.background.js";
import {SoulPlayer} from "./player/soul.player.js";
import {POKB, PTKB} from "./default.conf.js";


export class Game{

    constructor(height, width) {
        this.canvas = document.createElement("canvas")
        this.canvas.width = width
        this.canvas.height = height
        this.context = this.canvas.getContext("2d")
    }

    init() {
        this.activeBackground = new SimpleBackground(this.canvas, this.context)
        this.activeBackground.fillBackground()

        this.playerOne = new SoulPlayer(this.canvas, this.context, 10, POKB)
        this.playerTwo = new SoulPlayer(this.canvas, this.context, 600, PTKB)

        document.body.appendChild(this.canvas)

        window.addEventListener("keypress", (event) => {
            event.preventDefault()
            this.playerOne.keyPress(event.key)
            this.playerTwo.keyPress(event.key)
        })

        window.addEventListener("keyup", (event) => {
            event.preventDefault()
            this.playerOne.keyUp(event.key)
            this.playerTwo.keyUp(event.key)
        })
    }

    animate() {
        window.requestAnimationFrame(()=> this.animate())
        this.activeBackground.fillBackground()
        this.playerOne.update()
        this.playerTwo.update()
    }

}

