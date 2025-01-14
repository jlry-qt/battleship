import { Bot } from '../src/assets/js/bots'

let bot

beforeEach(() => {
    bot = new Bot()
})

test('Bot exist', () => {
    expect(bot).not.toBeUndefined()
})

test('Bot generates paired number', () => {
    const arr = bot.getAttack()

    expect(typeof arr[0]).toEqual('number')
    expect(typeof arr[1]).toEqual('number')
})

test('Bot generates a paired number in range of board', () => {
    for (let i = 1; i <= 99; i++) {
        const arr = bot.getAttack()

        expect(arr[0]).toBeGreaterThanOrEqual(0)
        expect(arr[0]).toBeLessThanOrEqual(9)
        expect(arr[1]).toBeGreaterThanOrEqual(0)
        expect(arr[1]).toBeLessThanOrEqual(9)
    }
})

test('Bot does not repeat paired number', () => {
    const attacks = new Set()
    for (let i = 0; i <= 250; i++) {
        let atk = bot.getAttack()
        if (atk !== -1) {
            attacks.add(atk)
        }
    }

    expect(attacks.size).toEqual(100)
})
