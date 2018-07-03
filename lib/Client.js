/**
 * @link      https://github.com/themadbox
 * @copyright Copyright (c) Fluid Sport srl (https://www.fluidnext.com/)
 * @license   https://opensource.org/licenses/BSD-3-Clause New BSD License
 */



const Utils = require('./../Utils');
const Parser = require('./parser/Parser');
const EventEmitter = require('events');

class Client extends EventEmitter {

    /**
     *
     * @param adapter
     * @param parser
     */
    constructor(adapter) {
        super();
        this.adapter = adapter;
        this.adapter.attachDataEvent(this._onData.bind(this));
        this.parser = new Parser();
        this.parser.on('_message', this.onMessage.bind(this));
        this.lastMessage = '';
    }

    /**
     *
     * @param adapter
     * @return {Client}
     */
    setAdapter(adapter) {
        this.adapter = adapter;
        return this;
    }

    /**
     * @return adapter
     */
    getAdapter(adapter) {
        return this.adapter;
    }

    /**
     * @param {Message} message
     */
    sendMessage(message) {

        let stringData = message.getStringMessage();
console.log('ooooooooo', stringData);
        let arrayData = stringData.split('').map(
            c => c.charCodeAt(0)
        );

        let buffer = new Buffer(20);
        for (let i = 0; i < arrayData.length; i++) {
            buffer[i] = arrayData[i];

        }

        this.adapter.sendMessage(buffer);
    }

    /**
     * @param data
     */
    _onData(data) {

        this.parser.parse(data);
    }

    /**
     * @param message
     */
    onMessage(message) {
        this.emit('message', message);
        this.lastMessage = message;
    }

    /**
     *
     */
    close() {
        this.adapter.close();
    }
}

module.exports = Client;