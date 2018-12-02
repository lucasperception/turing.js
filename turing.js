class Turing {
    constructor(tuples, tape, step) {
        this.tuples = tuples
        this.tape = tape.split(' ').join('_').split('')
        console.log(this.tape)
        this.negTape = []
        this.pos = 0
        this.step = step
        this.currentState = 0
        this.execute()
    }
    execute(){
        const MAX_STEPS = 99999
        let stepCount = 0
        let halted = false
        this.printTape()
        while(this.currentState !== "halt" && stepCount < MAX_STEPS){
            let readSymbol = this.readSymbol(this.pos)
            let command
            if (this.tuples[this.currentState+readSymbol]) {
                // console.log('nonWildcardState')
                command = this.tuples[this.currentState+readSymbol]
            }
            else if (this.tuples[this.currentState+"*"]) {
                // console.log('wildcardState')
                command = this.tuples[this.currentState+"*"]
            }
            this.writeSymbol(this.pos, readSymbol, command.writeSymbol)
            this.pos += command.direction
            this.currentState = command.newState
            stepCount++
            this.printTape()
        }
    }
    readSymbol(pos){
        switch (Math.sign(pos)) {
            case -1:
                if (typeof this.negTape[pos * -1] === 'undefined'){
                    this.negTape[pos * -1] = "_"
                }
                return this.negTape[pos * -1]
                break
            default:
                if (typeof this.tape[pos] === 'undefined'){
                    this.tape[pos] = "_"
                }
                return this.tape[pos]
        }
    }

    writeSymbol(pos, oldSymbol, newSymbol){
        if (newSymbol === "*") {
            newSymbol = oldSymbol
        }
        switch (Math.sign(pos)) {
            case -1:
                this.negTape[pos * -1] = newSymbol
                break
            default:
                this.tape[pos] = newSymbol
        }
    }

    printTape(){
        const PRINT_BUFFER = 15
        let output = ""
        const BEFORE_BUFFER = this.pos - PRINT_BUFFER
        const AFTER_BUFFER = this.pos + PRINT_BUFFER
        let printPos = BEFORE_BUFFER
        while (printPos < AFTER_BUFFER) {
            if (this.readSymbol(printPos)) {
                if (printPos == this.pos) {
                    output += "|"
                }
                output += this.readSymbol(printPos)
            }
            printPos++
        }
        console.log(output)
    }
}
module.exports = Turing