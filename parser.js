const fs = require('fs');
const readline = require('readline');

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
            const tupleId = this.generateTupleId(args[0],args[1])
            tuples[tupleId] = {
                writeSymbol: args[2],
                direction: Parser.translateDirections(args[3]),
                newState: args[4],
            }
        }
        return tuples
    }
    generateTupleId(state,readSymbol){
        return state.concat(readSymbol)
    }
    static translateDirections(arg) {
        switch (arg) {
            case "l":
                return -1
                break
            case "r":
                return 1
                break
            default:
                return 0
        }
    }
}
module.exports = Parser;