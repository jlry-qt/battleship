const shipConfig = (() => {
    const shipType = new Map()
    shipType.set(1, {
        len: 5,
        class: 'Carrier',
    })

    shipType.set(2, {
        len: 4,
        class: 'Battleship',
    })

    shipType.set(3, {
        len: 3,
        class: 'Destroyer',
    })

    shipType.set(4, {
        len: 3,
        class: 'Submarine',
    })

    shipType.set(5, {
        len: 2,
        class: 'Patrol Boat',
    })

    function getLength(id) {
        return shipType.get(id).len
    }

    function getClass(id) {
        return shipType.get(id).class
    }

    return { getLength, getClass }
})()

export class Ship {
    constructor(id) {
        this.id = id
        this.shipLength = shipConfig.getLength(id)
        this.class = shipConfig.getClass(id)
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
