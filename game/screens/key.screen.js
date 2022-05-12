import {Screen} from "./screen.js";
import {StartScreen} from "./start.screen.js";

export class KeyScreen extends Screen{

    constructor(game) {
        super(game);

        this.createTable()
        this.link = document.createElement("a")
        this.link.innerText =`Back`
        this.link.onclick = () => {
            this.hide()
            this.game.screen = new StartScreen(game)
            this.game.screen.show()
        }
        this.screen.appendChild(this.link)
    }

    createTable() {
        this.table = document.createElement("table")
        this.thead = this.table.createTHead()
        this.thead.innerHTML = "<th></th><th>Player One</th><th>Player Two</th>"
        this.tbody = this.table.createTBody()

        Object.keys(this.game.poKeyBindings).forEach(action => this.buildTableRow(action))

        this.screen.appendChild(this.table)
    }

    buildTableRow(action) {
        const tr = document.createElement("tr")
        const tdLabel = document.createElement("td")
        tdLabel.innerText = action.toUpperCase()
        const tdPO = document.createElement("td")
        tdPO.innerText = this.game.poKeyBindings[action]
        const tdPT = document.createElement("td")
        tdPT.innerText = this.game.ptKeyBindings[action]


        tr.appendChild(tdLabel)
        tr.appendChild(tdPO)
        tr.appendChild(tdPT)
        this.tbody.appendChild(tr)
    }
}