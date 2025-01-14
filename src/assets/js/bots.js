export class Bot {
    constructor() {
        this.sentAttack = new Set()
    }

    getAttack() {
        let atkCleared = false // Status if attacks is cleared of duplication or not
        let atk
        if (this.sentAttack.size >= 100) {
            return -1 // Means the bot sent all possible attacks
        }

        while (!atkCleared) {
            const x = Math.floor(Math.random() * 10)
            const y = Math.floor(Math.random() * 10)

            atk = [x, y]

            if (!this.sentAttack.has(`${atk}`)) {
                this.sentAttack.add(`${atk}`)
                atkCleared = true
            }
        }

        return atk
    }
}
