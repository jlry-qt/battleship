import { Ship } from '../src/assets/js/ship'

describe('Ship functions', () => {
    test('Assign ship length base on id', () => {
        const testShip = new Ship(1)
        const testShip2 = new Ship(2)
        const testShip3 = new Ship(3)
        const testShip4 = new Ship(4)
        const testShip5 = new Ship(5)

        expect(testShip.shipLength).toStrictEqual(5)
        expect(testShip2.shipLength).toStrictEqual(4)
        expect(testShip3.shipLength).toStrictEqual(3)
        expect(testShip4.shipLength).toStrictEqual(3)
        expect(testShip5.shipLength).toStrictEqual(2)
    })

    test('Increases hits', () => {
        const testShip = new Ship(5)

        testShip.hit()
        expect(testShip.hits).toBe(1)

        testShip.hit()
        expect(testShip.hits).toBe(2)

        testShip.hit()
        expect(testShip.hits).toBe(3)
    })

    test('Ships get sunk', () => {
        const testShip = new Ship(2)

        testShip.hit()
        testShip.hit()
        testShip.hit()
        expect(testShip.isSunk()).toBeFalsy()

        testShip.hit()
        expect(testShip.isSunk()).toBeTruthy()
    })

    test('Ship get sunk 2', () => {
        const testShip = new Ship(5)

        testShip.hit()
        expect(testShip.isSunk()).toBeFalsy()

        testShip.hit()
        expect(testShip.isSunk()).toBeTruthy()

        testShip.hit()
        expect(testShip.isSunk()).toBeTruthy()
    })
})
