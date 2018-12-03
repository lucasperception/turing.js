const fs = require('fs');

class Parser {
    constructor(path) {
        return this.parse(this.loadProgram(path))
    }

    loadProgram(path){
        console.log(`Loading Program...`)
        return fs.readFileSync(path).toString().split("\n")
    }

    parse(src){
        console.log(`Parsing...`)
        let tuples = {};
        for (const tuple of src) {
            const args = tuple.split(' ')
            tuples[this.tupleId(args[0],args[1])] = {
                writeSymbol: args[2],
                direction: Parser.translateDirections(args[3]),
                newState: args[4],
            }
        }
        return tuples
    }
    tupleId(state,readSymbol){
        return state.concat(readSymbol)
    }
    static translateDirections(arg) {
        return arg === 'l' ?  -1 : arg === 'r' ? 1 : 0
    }
}
module.exports = Parser;