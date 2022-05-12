import {SelectionScreen} from "./selection.screen.js";
import {KeyScreen} from "./key.screen.js";
import {Screen} from "./screen.js";

export class StartScreen extends Screen{

    menuItems = [
        {
            label: "Start",
            click: () => {
                this.hide()
                this.game.start()
            }
        },
        {
            label: "Key Binding",
            click: () => {
                this.hide()
                this.game.screen = new KeyScreen(this.game)
                this.game.screen.show()
            }
        }
    ]

    constructor(game) {
        super(game)
        this.list = document.createElement("ul")
        this.list.className = "menu-list"
        this.menuItems.forEach(item => this.buildMenuItem(item))
        this.screen.appendChild(this.list)
    }

    buildMenuItem(item){
        const li = document.createElement("li")
        const link = document.createElement("a")
        link.innerText = item.label
        link.onclick = item.click
        li.appendChild(link)
        this.list.appendChild(li)
    }
}