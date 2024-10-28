import { Gameboard } from '../src/assets/js/gameboard'
import { Ship } from '../src/assets/js/ship'

test('Creates 10x10 board', () => {
    const board = new Gameboard()

    expect(board.grid).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ])
})

describe('Placing ships', () => {
    let board // Place holder

    beforeEach(() => {
        board = new Gameboard()
    })

    test('Place ship horizontally with length 5', () => {
        let shipId = 1
        const ship = new Ship(shipId)
        const x = 0
        const y = 2

        board.placeShip(x, y, ship)

        expect(board.grid).toStrictEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ])
    })

    test('Place ship horizontally with length 4', () => {
        let shipId = 2
        const ship = new Ship(shipId)
        const x = 3
        const y = 2

        board.placeShip(x, y, ship)

        expect(board.grid).toStrictEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ])
    })

    test('Place ship vertically with length of 4', () => {
        let shipId = 2
        const ship = new Ship(shipId)
        const x = 0
        const y = 2

        board.placeShip(x, y, ship, 'vertical')

        expect(board.grid).toStrictEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ])
    })

    test('Place ship vertically with length of 2', () => {
        const shipId = 5
        const ship = new Ship(shipId)
        const x = 0
        const y = 0

        board.placeShip(x, y, ship, 'vertical')

        expect(board.grid).toStrictEqual([
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ])
    })

    test('Cannot place overlapping ship', () => {
        const shipId = 5
        const ship1 = new Ship(shipId)
        const ship2 = new Ship(shipId)
        const x = 0
        const y = 0

        board.placeShip(x, y, ship1)

        expect(board.placeShip(x, y, ship2)).toBeFalsy()
        expect(board.grid).toStrictEqual([
            [5, 5, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ])
    })

    test('Cannot place overlapping ship 2', () => {
        const shipId = 1
        const ship = new Ship(shipId)
        const x = 4
        const y = 0

        board.placeShip(x, y, ship)

        expect(board.placeShip(0, 0, ship)).toBe(false)
        expect(board.grid).toStrictEqual([
            [0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ])
    })

    test('Cannot place outside of board range', () => {
        const shipId = 1
        const ship = new Ship(shipId)
        const x = 10
        const y = 1

        board.placeShip(x, y, ship)
        expect(board.grid).toStrictEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ])
    })

    test('Cannot place outside of board range', () => {
        const shipId = 1
        const ship = new Ship(shipId)
        const x = -10
        const y = -1

        board.placeShip(x, y, ship)
        expect(board.grid).toStrictEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ])
    })

    test('Keep track of ships placed on board', () => {
        const shipId = 1
        const ship = new Ship(shipId)

        board.placeShip(1, 1, ship)
        expect(board.ships.size).toBe(1)
        expect(board.ships.get(shipId)).toBe(ship)
    })

    test('Track multiple ships placed on board', () => {
        for (let id = 5; id >= 1; id--) {
            let ship = new Ship(id)
            board.placeShip(id, id, ship)

            expect(board.ships.get(id)).toBe(ship)
        }

        expect(board.ships.size).toBe(5)
    })
})

describe('Board recieving attack', () => {
    let board
    beforeEach(() => {
        board = new Gameboard()
    })

    test('Send attack on board', () => {
        board.recieveAttack(0, 0)

        // Every miss is indicated with -1
        expect(board.grid).toStrictEqual([
            [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ])
    })

    test('Send attack on ship', () => {
        const shipOne = new Ship(1)
        const shipTwo = new Ship(2)

        board.placeShip(0, 2, shipOne)
        board.placeShip(3, 4, shipTwo)

        board.recieveAttack(0, 2)
        board.recieveAttack(1, 2)

        expect(board.grid).toStrictEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [-2, -2, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ])

        board.recieveAttack(4, 2)

        expect(board.grid).toStrictEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [-2, -2, 1, 1, -2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ])
    })

    test('Cannot send attack on tile already attacked', () => {
        board.recieveAttack(0, 0)
        expect(board.recieveAttack(0, 0)).toBe(false)
        expect(board.grid).toStrictEqual([
            [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ])

        board.recieveAttack(1, 2)
        expect(board.recieveAttack(1, 2)).toBe(false)
        expect(board.grid).toStrictEqual([
            [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ])
    })

    test('Attack out of board range', () => {
        expect(board.recieveAttack(0, 10)).toBe(false)
        expect(board.recieveAttack(-1, 8)).toBe(false)
        expect(board.recieveAttack(-1, 10)).toBe(false)
        expect(board.recieveAttack(12, 4)).toBe(false)
    })

    test('Trigger hit to ship when hit', () => {
        const shipId = 1
        const ship = new Ship(shipId)

        board.placeShip(0, 0, ship)
        board.recieveAttack(0, 0)

        expect(board.ships.get(shipId).hits).toBe(1)
        // Maybe add more test?
    })

    test('Remove sunken ship from ship map', () => {
        const shipOne = new Ship(1)
        const shipTwo = new Ship(2)

        board.placeShip(0, 2, shipOne)
        board.placeShip(5, 5, shipTwo, 'vertical')

        for (let i = 0; i <= 4; i++) {
            board.recieveAttack(i, 2)
        }

        expect(board.ships.size).toBe(1)

        for (let i = 5; i <= 9; i++) {
            board.recieveAttack(5, i)
        }

        expect(board.ships.size).toBe(0)
    })

    test('Reports if all ship is sunk', () => {
        const shipOne = new Ship(1)

        board.placeShip(0, 2, shipOne)

        board.recieveAttack(0, 2)
        expect(board.isGameOver()).toBe(false)

        board.recieveAttack(1, 2)
        expect(board.isGameOver()).toBe(false)

        board.recieveAttack(2, 2)
        expect(board.isGameOver()).toBe(false)

        board.recieveAttack(3, 2)
        expect(board.isGameOver()).toBe(false)

        board.recieveAttack(4, 2)
        expect(board.isGameOver()).toBe(true)

        // Last shit touched
    })
})

/* TO DO */
/* Try and changed object by value instead of object by reference when placing ship. */
