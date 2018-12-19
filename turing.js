const {performance} = require('perf_hooks');
class Turing {

    constructor(tuples, tape, step, startState) {
        this.PRINT_BUFFER = 15
        this.MAX_STEPS = 999999
        this.tape = tape.split(' ').join('_').split('')
        this.negTape = []
        this.pos = 0
        this.state = startState
        this.execute(tuples, step)
    }

    execute(tuples, step){
        let stepCount = 0
        this.printTape()
        const execStartTime = performance.now();
        while(this.state !== "halt" && stepCount < this.MAX_STEPS){
            this.runCommand(tuples)
            if (step === 1) this.printTape()
            stepCount++
        }
        console.log(`Execution Time ${performance.now() - execStartTime}`)
        console.log(`Step Count: ${stepCount}`)
        this.printTape()
    }

    runCommand(tuples){
        let read = this.read(this.pos)
        const COMMAND = tuples[this.state+read] ? tuples[this.state+read] : tuples[this.state+"*"]
        this.writeSymbol(this.pos, read, COMMAND.writeSymbol)
        this.pos += COMMAND.direction
        this.state = COMMAND.newState
    }

    read(pos){
        let temp = Math.sign(pos) === -1 ? this.negTape[pos * -1] : this.tape[pos]
        if (typeof temp === 'undefined') return "_"
        return temp
    }

    writeSymbol(pos, oldSymbol, newSymbol){
        if (newSymbol === "*") newSymbol = oldSymbol
        Math.sign(pos) === -1 ? this.negTape[pos * -1] = newSymbol : this.tape[pos] = newSymbol
    }

    printTape(){
        let output = ""
        let printPos = this.pos - this.PRINT_BUFFER
        while (printPos < this.pos + this.PRINT_BUFFER) {
            if (this.read(printPos)) {
                if (printPos === this.pos) output += "|"
                output += this.read(printPos)
            }
            printPos++
        }
        console.log(output)
    }
}
module.exports = Turing