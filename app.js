const Parser = require('./parser.js')
const Turing = require('./turing.js')
class App {
    constructor() {
        console.log(`Initializing turing.js`)
        const src = new Parser(`./turing_samples/unary_multiplication.txt`)
        new Turing(src,`llllllllllxllllllllllllllllllllllllllllll`,0,"q0")
    }
}
module.exports = App