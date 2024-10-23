import './assets/styles/style.css'

const playerBoard = document.querySelector('#pla-board')
const computerBoard = document.querySelector('#comp-board')

document.addEventListener('DOMContentLoaded', () => {
    // Generate a 10x10 grid
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            /* eslint-disable */
            let playerTile = document.createElement('div')

            playerTile.classList.add('tile')
            playerTile.dataset.x = i
            playerTile.dataset.y = j

            let computerTile = document.createElement('div')

            computerTile.classList.add('tile')
            computerTile.dataset.x = i
            computerTile.dataset.y = j

            playerBoard.appendChild(playerTile)
            computerBoard.appendChild(computerTile)
        }
    }
})
