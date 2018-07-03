/**
 * @link      https://github.com/themadbox
 * @copyright Copyright (c) Fluid Sport srl (https://www.fluidnext.com/)
 * @license   https://opensource.org/licenses/BSD-3-Clause New BSD License
 */


const Utils = require('./../Utils');

class SerialPortAdapter {

    /**
     * @param resource
     * @param options
     */
    constructor(resource, options) {
        let serialPort = require('serialport');
        this.serial = new serialPort(resource, options);

        this.serial.on('error', (err) => {
            console.log(Utils.RED_CONSOLE, 'Error serial port: ', err);
        });

        this.serial.on('open', (err) => {
            if (err) {
                console.log(Utils.RED_CONSOLE, 'Error serial port: ', err);
                return;
            }

            console.log(Utils.BLUE_CONSOLE, 'Connected serial port');
        });
    }

    /**
     * @param fn
     */
    attachDataEvent(fn) {
        this.serial.on('data', fn);
    }

    /**
     * @param data
     */
    sendMessage(buffer) {

        this.serial.write(buffer, function (err) {
            if (err) {
                console.log(Utils.RED_CONSOLE, 'Error serial port: ', err);
                return;
            }
        });
    }
}

module.exports = SerialPortAdapter;