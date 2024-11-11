import { Ship } from './ship.js'
import { Gameboard } from './gameboard.js'

class Game {
    constructor() {
        this.playerBoard = new Gameboard()
        this.enemyBoard = new Gameboard()

        this.#initializeGame()
    }

    #initializeGame() {
        // default ship placement should start from the first tile and horizontally
        const xCoordinate = 0
        let yCoordinate = 0

        for (let id = 1; id <= 5; id++) {
            const playerShip = new Ship(id)
            const enemyShip = new Ship(id)

            this.playerBoard.placeShip(xCoordinate, yCoordinate, playerShip)
            this.enemyBoard.placeShip(xCoordinate, yCoordinate, enemyShip)

            yCoordinate += 1
        }
    }

    startGame() {}
}

const GameManager = (() => {
    const game = new Game()

    // function startGame() {}

    function getBoardInfo() {
        return {
            playerBoardInfo: game.playerBoard,
            enemyBoardInfo: game.playerBoard,
        }
    }

    return { getBoardInfo }
})()

export { GameManager }
