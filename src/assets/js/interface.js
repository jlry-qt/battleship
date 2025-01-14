import { GameManager } from './game.js'
import shipConfig from '../static/ship-config.json'
const playerBoardElem = document.querySelector('#pla-board')
const computerBoardElem = document.querySelector('#comp-board')
const startButton = document.querySelector('#start-btn')
const playerShipyard = document.querySelector('#player-shipyard')
const computerShipyard = document.querySelector('#comp-shipyard')

let gameStarted = false

function initiateBoardInterface() {
    for (let y = 0; y <= 9; y++) {
        for (let x = 0; x <= 9; x++) {
            const tileElem = document.createElement('div')

            tileElem.classList.add('tile')
            tileElem.dataset.x = x
            tileElem.dataset.y = y

            playerBoardElem.appendChild(tileElem)
            computerBoardElem.appendChild(tileElem.cloneNode(true))
        }
    }

    generateMovableShips()
    enableDragDrop()
    // Allows direction change
    playerBoardElem.addEventListener('click', changeShipOverlayDirection)
}

/* Set up the initial position of ships */
function generateMovableShips() {
    /* eslint-disable */
    const y = 0
    let initialX = 0

    const ids = [5, 4, 3, 2, 1]

    for (let id of ids) {
        let movableShip = document.createElement('div')
        movableShip.classList.add('ship-overlay')
        movableShip.dataset.dir = 'vert'
        movableShip.draggable = true
        movableShip.dataset.len = shipConfig[id].len
        movableShip.id = id

        let initialPos = playerBoardElem.querySelector(
            `div[data-x = '${initialX}'][data-y = '${y}']`,
        )

        initialPos.appendChild(movableShip)

        initialX += 1
    }
}

/* This function enables the draggable object to be dragged and dropped to other tile */
function enableDragDrop() {
    const tiles = playerBoardElem.querySelectorAll('.tile')
    tiles.forEach((tile) => {
        tile.addEventListener('dragenter', (ev) => {
            ev.target.classList.add('hover') // For target tile indicator
        })

        tile.addEventListener('dragleave', (ev) => {
            ev.target.classList.remove('hover') // For target tile indicator
        })

        tile.addEventListener('dragover', (ev) => {
            ev.preventDefault()
        })
        tile.addEventListener('drop', (ev) => {
            ev.target.classList.remove('hover')
            dragDropManager.drop(ev.target)
        })
    })
}

/* This function enables the draggable object to be dragged and dropped to other tile */
function lockBoard() {
    const movableShips = document.querySelectorAll('.ship-overlay')
    movableShips.forEach((ship) => {
        ship.classList.add('opac')
        ship.draggable = false
    })

    playerBoardElem.removeEventListener('click', changeShipOverlayDirection)
}

// Copy pasta
function areElementsOverlapping(shipElem1, shipElem2) {
    const rect1 = shipElem1.getBoundingClientRect()
    const rect2 = shipElem2.getBoundingClientRect()

    return !(
        rect1.right < rect2.left || // elem1 is to the left of elem2
        rect1.left > rect2.right || // elem1 is to the right of elem2
        rect1.bottom < rect2.top || // elem1 is above elem2
        rect1.top > rect2.bottom
    )
}

// Take is in the shipElemen and new direction to be set.
function outOfBoard(shipElem) {
    const initialX = shipElem.parentElement.dataset.x - 0 // converts into number
    const initialY = shipElem.parentElement.dataset.y - 0 // convert into number
    const shipLen = shipElem.dataset.len - 1
    const dir = shipElem.dataset.dir

    if (dir === 'vert') {
        return initialY + shipLen > 9
    } else if (dir === 'horiz') {
        return initialX + shipLen > 9
    }
}

const dragDropManager = (() => {
    let draggableObject = null
    let parentElement = null

    function drop(targetTile) {
        const shipObjects = playerBoardElem.querySelectorAll('.ship-overlay')

        targetTile.appendChild(draggableObject)

        if (outOfBoard(draggableObject)) {
            parentElement.appendChild(draggableObject)
            return
        }

        for (let ship of shipObjects) {
            if (ship === draggableObject) {
                continue
            }

            if (areElementsOverlapping(draggableObject, ship)) {
                parentElement.appendChild(draggableObject) // Revert back to original position
                return
            }
        }
    }

    playerBoardElem.addEventListener('dragstart', (ev) => {
        draggableObject = ev.target
        parentElement = ev.target.parentElement
        draggableObject.classList.add('dragged')
    })

    playerBoardElem.addEventListener('dragend', (ev) => {
        draggableObject.classList.remove('dragged')
        parentElement = null
        draggableObject = null
    })

    return { drop }
})()

function changeShipOverlayDirection(ev) {
    if (ev.target.classList.contains('ship-overlay')) {
        changeDirection(ev.target)
    }
}

function changeDirection(el) {
    const shipObjects = playerBoardElem.querySelectorAll('.ship-overlay')
    const initialDir = el.dataset.dir

    if (initialDir === 'vert') {
        el.dataset.dir = 'horiz'
    } else {
        el.dataset.dir = 'vert'
    }

    // Prevent out of range
    if (outOfBoard(el)) {
        el.dataset.dir = initialDir
    }

    // Prevent from overlapping
    for (let ship of shipObjects) {
        if (ship === el) {
            continue
        }

        if (areElementsOverlapping(el, ship)) {
            el.dataset.dir = initialDir
            return
        }
    }
}

startButton.addEventListener('click', () => {
    if (gameStarted) {
        return
    }

    //Lock board
    lockBoard()
    //Send information to gamestate
    const shipElems = document.querySelectorAll('.ship-overlay')
    const shipUserInfo = []

    // Generate shi and place it
    shipElems.forEach((ship) => {
        // Get the pivots
        // Get ship orientatin/direction
        // Get ship length
        const direction = ship.dataset.dir
        const len = ship.dataset.len
        const id = parseInt(ship.id)
        const x = parseInt(ship.parentElement.dataset.x)
        const y = parseInt(ship.parentElement.dataset.y)
        shipUserInfo.push({ x, y, id, direction, len })
    })

    GameManager.startGame(shipUserInfo)
    initiateGameboard()
})

function renderBoard() {
    const boardInfo = GameManager.getBoards()
    const playerBoard = boardInfo.playerBoard
    const enemyBoard = boardInfo.enemyBoard

    playerBoardElem.replaceChildren()
    playerShipyard.replaceChildren()
    computerBoardElem.replaceChildren()
    computerShipyard.replaceChildren()

    for (let y = 0; y <= 9; y++) {
        for (let x = 0; x <= 9; x++) {
            const tileElem = document.createElement('div')

            if (playerBoard.grid[y][x] === -1) {
                tileElem.classList.add('marked')
            }

            if (playerBoard.grid[y][x] === -2) {
                tileElem.classList.add('hit')
            }

            tileElem.classList.add('tile')
            tileElem.dataset.x = x
            tileElem.dataset.y = y

            playerBoardElem.appendChild(tileElem)
        }
    }

    // Render ships
    playerBoard.ships.forEach((ship) => {
        let shipElem = document.createElement('div')
        shipElem.classList.add('ship-overlay')
        shipElem.classList.add('opac')
        shipElem.dataset.dir = ship.direction
        shipElem.dataset.len = shipConfig[ship.ship.id].len
        shipElem.id = ship.ship.id

        let initialPos = playerBoardElem.querySelector(
            `div[data-x = '${ship.x}'][data-y = '${ship.y}']`,
        )

        initialPos.appendChild(shipElem)

        // Render text
        const shipClass = ship.ship.class

        const shipText = document.createElement('div')
        shipText.classList.add('ship-text')
        shipText.textContent = shipClass
        playerShipyard.appendChild(shipText)
    })

    // Render ships
    enemyBoard.ships.forEach((ship) => {
        const shipClass = ship.ship.class

        const shipText = document.createElement('div')
        shipText.classList.add('ship-text')
        shipText.textContent = shipClass
        computerShipyard.appendChild(shipText)
    })

    for (let y = 0; y <= 9; y++) {
        for (let x = 0; x <= 9; x++) {
            const tileElem = document.createElement('div')

            if (enemyBoard.grid[y][x] === -1) {
                tileElem.classList.add('marked')
            }

            if (enemyBoard.grid[y][x] === -2) {
                tileElem.classList.add('hit')
            }

            tileElem.classList.add('tile')
            tileElem.dataset.x = x
            tileElem.dataset.y = y

            computerBoardElem.appendChild(tileElem)
        }
    }
}

// This function allows the player to place hit when game is started
function initiateGameboard() {
    renderBoard()

    computerBoardElem.addEventListener('click', (e) => {
        if (
            !e.target.classList.contains('tile') ||
            e.target.classList.contains('marked') ||
            e.target.classList.contains('hit')
        ) {
            return
        }

        let x = e.target.dataset.x
        let y = e.target.dataset.y

        const result = GameManager.sendAttack(x, y)

        if (result.status === 'end') {
            gameStarted = false
            console.log(result)
        }

        renderBoard()
    })
}

document.addEventListener('DOMContentLoaded', initiateBoardInterface)
