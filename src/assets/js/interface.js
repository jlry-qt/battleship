import { GameManager } from './game-manager'
const playerBoardElem = document.querySelector('#pla-board')
const computerBoardElem = document.querySelector('#comp-board')

function initiateBoardInterface() {
    for (let x = 0; x <= 9; x++) {
        for (let y = 0; y <= 9; y++) {
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
}

/* Set up the initial position of ships */
function generateMovableShips() {
    /* eslint-disable */
    const x = 0
    let initialY = 0

    let shipLengths = [5, 4, 3, 3, 2]

    for (let shipLen of shipLengths) {
        let movableShip = document.createElement('div')
        movableShip.classList.add('ship-overlay')
        movableShip.dataset.dir = 'vert'
        movableShip.draggable = true
        movableShip.dataset.len = shipLen

        let initialPos = playerBoardElem.querySelector(
            `div[data-x = '${x}'][data-y = '${initialY}']`,
        )

        initialPos.appendChild(movableShip)

        shipLen -= 1
        initialY += 1
    }
}

/* This function enables the draggable object to be dragged and dropped to other tile */
function enableDragDrop() {
    const tiles = playerBoardElem.querySelectorAll('.tile')
    for (const element of tiles) {
        element.addEventListener('dragenter', (ev) => {
            ev.target.classList.add('hover') // For target indicator
        })

        element.addEventListener('dragleave', (ev) => {
            ev.target.classList.remove('hover') // For target indicator
        })

        element.addEventListener('dragover', (ev) => {
            ev.preventDefault()
        })
        element.addEventListener('drop', (ev) => {
            ev.target.classList.remove('hover')
            dragDropManager.drop(ev.target)
        })
    }
}

const dragDropManager = (() => {
    let dragableObject = null

    function drop(targetTile) {
        targetTile.appendChild(dragableObject)
        dragableObject = null
    }

    playerBoardElem.addEventListener('dragstart', (ev) => {
        dragableObject = ev.target
    })

    return { drop }
})()

document.addEventListener('DOMContentLoaded', initiateBoardInterface)
