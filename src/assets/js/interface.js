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

// Copy pasta
function areElementsOverlapping(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect()
    const rect2 = elem2.getBoundingClientRect()

    return !(
        (
            rect1.right < rect2.left || // elem1 is to the left of elem2
            rect1.left > rect2.right || // elem1 is to the right of elem2
            rect1.bottom < rect2.top || // elem1 is above elem2
            rect1.top > rect2.bottom
        ) // elem1 is below elem2
    )
}

const dragDropManager = (() => {
    let draggableObject = null
    let parentElement = null

    function drop(targetTile) {
        const shipObjects = playerBoardElem.querySelectorAll('.ship-overlay')
        const x = targetTile.dataset.x - 0 // Minus zero to convert them to number
        const y = targetTile.dataset.y - 0

        const shipDirection = draggableObject.dataset.dir
        const shipLength = draggableObject.dataset.len - 1 // to match zero index coordinates

        // Prevent from placing out of range
        if (shipDirection === 'vert') {
            const result = x + shipLength

            if (result > 9) {
                return
            }
        } else {
            const result = y + shipLength

            if (result > 9) {
                return
            }
        }

        targetTile.appendChild(draggableObject)

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

document.addEventListener('DOMContentLoaded', initiateBoardInterface)
