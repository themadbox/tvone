/**
 * @link      https://github.com/themadbox
 * @copyright Copyright (c) Fluid Sport srl (https://www.fluidnext.com/)
 * @license   https://opensource.org/licenses/BSD-3-Clause New BSD License
 */


const Utils = require('./../Utils');
const EventEmitter = require('events');

class Parser extends EventEmitter {

    constructor() {
        super();
        this.message = '';
    }

    /**
     * @param stringMessage
     * @return {*}
     */
    parse(buffer) {

        for (let cont = 0; buffer.length > cont; cont++) {

            switch (buffer[cont]) {
                case 13:
                    this.emit('_message', this.message);
                    this.message = '';
                    break;
                default :
                    this.message = this.message + String.fromCharCode(buffer[cont]);
                    break;
            }
        }
    }
}

module.exports = Parser;
