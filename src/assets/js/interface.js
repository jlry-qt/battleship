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
            ev.target.classList.add('hover') // For target tile indicator
        })

        element.addEventListener('dragleave', (ev) => {
            ev.target.classList.remove('hover') // For target tile indicator
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
function areElementsOverlapping(shipElem1, shipElem2) {
    const rect1 = shipElem1.getBoundingClientRect()
    const rect2 = shipElem2.getBoundingClientRect()

    return !(
        (
            rect1.right < rect2.left || // elem1 is to the left of elem2
            rect1.left > rect2.right || // elem1 is to the right of elem2
            rect1.bottom < rect2.top || // elem1 is above elem2
            rect1.top > rect2.bottom
        ) // elem1 is below elem2
    )
}

// Take is in the shipElemen and new direction to be set.
function outOfBoard(shipElem) {
    const initialX = shipElem.parentElement.dataset.x - 0 // converts into number
    const initialY = shipElem.parentElement.dataset.y - 0 // convert into number
    const shipLen = shipElem.dataset.len - 1
    const dir = shipElem.dataset.dir

    if (dir === 'vert') {
        return initialX + shipLen > 9
    } else if (dir === 'horiz') {
        return initialY + shipLen > 9
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

document.addEventListener('DOMContentLoaded', initiateBoardInterface)
playerBoardElem.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('ship-overlay')) {
        changeDirection(ev.target)
    }
})
