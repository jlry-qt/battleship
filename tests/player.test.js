import { Player } from '../src/assets/js/player.js'

test('Player class exist', () => {
    expect(new Player()).toBeTruthy()
})

test('Player has gameboard', () => {
    const playerTest = new Player()

    expect(playerTest.gameboard).toEqual({
        grid: [
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
        ],
        ships: new Map(),
    })
})

test('Player type is real', () => {
    const playerTest = new Player('real')

    expect(playerTest.type).toBe('real')
})

test('Player type is computer', () => {
    const playerTest = new Player('computer')

    expect(playerTest.type).toBe('computer')
})
