/**
 * @link      https://github.com/themadbox
 * @copyright Copyright (c) Fluid Sport srl (https://www.fluidnext.com/)
 * @license   https://opensource.org/licenses/BSD-3-Clause New BSD License
 */

const Utils = require('./../../Utils');

class TcpPortAdapter {

    /**
     *
     * @param ip
     * @param port
     * @param options
     */
    constructor(ip, port, options) {

        let net = require('net');

        this.server = new net.Socket();
        this.server.connect(port, ip, function () {
            console.log(Utils.BLUE_CONSOLE, 'Connected tcp');
        });

        this.server.on('error', (err) => {
            console.log(Utils.RED_CONSOLE, 'Error tcp: ', err.message);
        });

        this.server.on('close', () => {
            console.log(Utils.BLUE_CONSOLE, 'Connection tcp closed');
        });
    }

    /**
     * @param {Buffer} data
     */
    sendMessage(buffer) {

        let response = this.server.write(buffer);
    }

    /**
     * @param fn
     */
    attachDataEvent(fn) {
        this.server.on('data', fn);
    }

    /**
     *
     */
    close() {
        this.server.destroy();
    }
}

module.exports = TcpPortAdapter;