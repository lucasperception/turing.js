const Parser = require('./parser.js')
const Turing = require('./turing.js')
class App {
    constructor() {
        console.log(`Initializing turing.js`)
        const src = new Parser(`./turing_samples/binary_multiplication.txt`)
        new Turing(src,`111 011`,1)
    }
}
module.exports = App