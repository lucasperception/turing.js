const fs = require('fs');
const readline = require('readline');

class Parser {
    constructor(path) {
        return this.parse(this.loadProgram(path))
    }

    loadProgram(path){
        return fs.readFileSync(path).toString().split("\n")
    }

    parse(src){
        console.log(`Parsing...`)
        let tuples = {};
        for (const tuple of src) {
            const args = tuple.split(' ')
            const tupleId = this.generateTupleId(args[0],args[1])
            switch (args[3]) {
                case "l":
                        args[3] = -1
                    break;
                case "r":
                    args[3] = 1
                    break;
                default:
                    args[3] = 0
            }
            tuples[tupleId] = {
                writeSymbol: args[2],
                direction: args[3],
                newState: args[4],
            }
        }
        return tuples
    }
    generateTupleId(state,readSymbol){
        return state.concat(readSymbol)
    }
}
module.exports = Parser;