import { Gameboard } from './gameboard'

export class Player {
    #gameboard

    constructor(playerType) {
        this.type = playerType
        this.#gameboard = new Gameboard()
    }

    get gameboard() {
        return this.#gameboard
    }
}
