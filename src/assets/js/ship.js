import shipConfig from '../static/ship-config.json'

export class Ship {
    constructor(id) {
        this.id = id
        this.shipLength = shipConfig[id].len
        this.class = shipConfig[id].class
        this.sunk = false
        this.hits = 0
    }

    hit() {
        this.hits += 1

        if (this.hits >= this.shipLength) {
            this.sunk = true
        }
    }

    isSunk() {
        return this.sunk
    }
}
