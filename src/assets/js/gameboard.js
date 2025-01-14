export class Gameboard {
    constructor() {
        this.grid = getGrid(10)
        this.ships = new Map()
    }

    /* eslint-disable */

    // Checks if tile is already occupied by a ship
    #isOverlap(x, y, shipLength, direction) {
        if (direction === 'horiz') {
            for (let i = 1; i <= shipLength; i++) {
                if (x > 9 || x < 0) {
                    return true
                }

                let tileValue = this.grid[y][x]

                if (tileValue !== 0) return true

                x += 1
            }
        } else if (direction === 'vert') {
            for (let i = 1; i <= shipLength; i++) {
                if (y > 9 || y < 0) {
                    return true
                }

                let tileValue = this.grid[y][x]
                if (tileValue !== 0) return true

                y += 1
            }
        }

        return false
    }
    /* eslint-enable */

    // Direction can be just a boolean
    placeShip(x, y, ship, direction = 'horiz') {
        let xCoordinate = x
        let yCoordinate = y

        if (
            this.#isOverlap(
                xCoordinate,
                yCoordinate,
                ship.shipLength,
                direction,
            )
        ) {
            return false
        }

        this.ships.set(ship.id, {
            ship,
            x: xCoordinate,
            y: yCoordinate,
            direction,
        })

        if (direction === 'horiz') {
            for (let i = 1; i <= ship.shipLength; i++) {
                // Place the id of the ship on the specified tile

                this.grid[yCoordinate][xCoordinate] = ship.id

                // Increment the X coordinate to next vertical point
                xCoordinate += 1
            }

            return true
        } else if (direction === 'vert') {
            for (let i = 1; i <= ship.shipLength; i++) {
                // Place the id of the ship on the specified tile

                this.grid[yCoordinate][xCoordinate] = ship.id

                // Increment the Y coordinate to next vertical point
                yCoordinate += 1
            }

            return true
        }
    }

    // return false meaning the operation was unsuccesful
    // Assigns -1 to tile if the hit is empty
    // Assigs -2 to tile if hit is on ship
    recieveAttack(x, y) {
        const xCoordinate = x
        const yCoordinate = y

        // Return false out of range
        if (
            xCoordinate > 9 ||
            xCoordinate < 0 ||
            yCoordinate > 9 ||
            yCoordinate < 0
        ) {
            return false
        }

        // Assigns either 0 if the grid is empty or the ship ID
        const gridMark = this.grid[yCoordinate][xCoordinate]

        if (gridMark === 0) {
            this.grid[yCoordinate][xCoordinate] = -1
            return
        }

        // The grid is already hit
        if (gridMark < 0) {
            return false
        }

        const targetShip = this.ships.get(gridMark).ship

        // Trigger hit
        targetShip.hit()
        this.grid[yCoordinate][xCoordinate] = -2

        if (targetShip.isSunk()) {
            this.ships.delete(gridMark)
        }
    }

    isGameOver() {
        if (this.ships.size <= 0) {
            return true
        }

        return false
    }
}

const getGrid = function generateGrid(size) {
    const grid = []

    for (let i = 1; i <= size; i++) {
        const row = []
        for (let j = 1; j <= size; j++) {
            row.push(0)
        }
        grid.push(row)
    }

    // Returns a reference of the grid array
    return grid
}
