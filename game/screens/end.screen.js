
import {Screen} from "./screen.js";
import {StartScreen} from "./start.screen.js";

export class EndScreen extends Screen{

    timer = 10

    constructor(game, message) {
        super(game)
        this.container = document.createElement("div")
        this.container.className = "end-screen"
        this.message = document.createElement("h1")
        this.message.innerText = message
        this.container.appendChild(this.message)

        this.link = document.createElement("a")
        this.interval = setInterval(()=> {
            this.timer--
            if(this.timer >= 0) this.link.innerText =`Continue? ...${this.timer}`
            else if(this.timer === -1 ) {
                clearInterval(this.interval)
                this.hide()
                this.game.screen = new StartScreen(game)
                this.game.screen.show()
            }
        }, 1000)
        this.link.innerText =`Continue? ...${this.timer}`
        this.link.onclick = () => {
            this.hide()
            this.game.start()
        }
        this.container.appendChild(this.link)
        this.screen.appendChild(this.container)
    }


}