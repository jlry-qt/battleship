import { Ship } from './ship.js'
import { Gameboard } from './gameboard.js'
import { Bot } from './bots.js'

class Game {
    constructor(playerBoard, enemyBoard) {
        this.playerBoard = playerBoard
        this.enemyBoard = enemyBoard
        this.bot = new Bot()
    }

    botAttack() {
        const atkCoords = this.bot.getAttack()
        this.playerBoard.recieveAttack(atkCoords[0], atkCoords[1])

        return this.enemyBoard.isGameOver()
    }
}

const GameManager = (() => {
    let game

    function startGame(shipUserInfo) {
        const playerBoard = generateBoard(shipUserInfo)
        const enemyBoard = generateEnemyBoard()

        if (game) {
            return
        }

        game = new Game(playerBoard, enemyBoard)
    }

    function sendAttack(x, y) {
        game.enemyBoard.recieveAttack(x, y)
        game.botAttack() //Make the bot attack

        const playerBoardStatus = game.playerBoard.isGameOver()
        const enemyBoardStatus = game.enemyBoard.isGameOver()

        if (playerBoardStatus) {
            return { status: 'end', winner: 'bot' }
        }

        if (enemyBoardStatus) {
            return { status: 'end', winner: 'player' }
        }

        return { status: 'ongoing' }
    }

    function generateBoard(shipInfo) {
        const board = new Gameboard()

        for (const obj of shipInfo) {
            const { x, y, id, direction } = obj
            const ship = new Ship(id)
            board.placeShip(x, y, ship, direction)
        }

        return board
    }

    function generateEnemyBoard() {
        const board = new Gameboard()
        let id = 1
        while (id <= 5) {
            const x = Math.floor(Math.random() * 10)
            const y = Math.floor(Math.random() * 10)
            const directionDecider = Math.floor(Math.random() * 2)

            const direction = directionDecider === 1 ? 'horiz' : 'vert'

            const ship = new Ship(id)
            const result = board.placeShip(x, y, ship, direction)

            // means result is success
            if (result) {
                id += 1
            }
        }
        return board
    }

    function getBoards() {
        return { playerBoard: game.playerBoard, enemyBoard: game.enemyBoard }
    }

    return { startGame, sendAttack, getBoards }
})()

export { GameManager }
