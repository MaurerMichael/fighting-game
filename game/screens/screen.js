import {GID} from "../default.conf.js";

export class Screen {

    gameContainer
    screen
    game

    constructor(game) {
        this.game = game
        this.gameContainer = document.getElementById(GID)
        this.screen = document.createElement("div")
        this.screen.id = 'screen'
    }

    show(){
        this.gameContainer.appendChild(this.screen)
        this.game.screen = this.screen
    }

    hide(){
        this.gameContainer.removeChild(this.screen)
        this.game.screen = undefined
    }

}