class Turing {
    constructor(tuples, tape, step) {
        this.PRINT_BUFFER = 15
        this.MAX_STEPS = 99999
        this.tape = tape.split(' ').join('_').split('')
        this.negTape = []
        this.pos = 0
        this.currentState = 0
        this.execute(tuples, step)
    }
    execute(tuples, step){
        let stepCount = 0
        this.printTape()
        while(this.currentState !== "halt" && stepCount < this.MAX_STEPS){
            this.runCommand(tuples)
            if (step === 1) this.printTape()
            stepCount++
        }
        this.printTape()
    }

    runCommand(tuples){
        let readSymbol = this.readSymbol(this.pos)
        let command
        command = tuples[this.currentState+readSymbol] ? tuples[this.currentState+readSymbol] : tuples[this.currentState+"*"]
        this.writeSymbol(this.pos, readSymbol, command.writeSymbol)
        this.pos += command.direction
        this.currentState = command.newState
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
        let output = ""
        let printPos = this.pos - this.PRINT_BUFFER
        while (printPos < this.pos + this.PRINT_BUFFER) {
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