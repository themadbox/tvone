/**
 * @link      https://github.com/themadbox
 * @copyright Copyright (c) Fluid Sport srl (https://www.fluidnext.com/)
 * @license   https://opensource.org/licenses/BSD-3-Clause New BSD License
 */

(function() {
    'use strict';

    const Client = require('./lib/Client');
    const SerialPortAdapter = require('./lib/adapter/SerialPortAdapter');
    const TcpAdapter = require('./lib/adapter/TcpAdapter');
    const Parser = require('./lib/parser/Parser');
    const Message = require('./lib/Message');
    const Utils = require('./lib/Utils');

    let prompt = require('prompt');

    let adapter = new TcpAdapter(
        '192.168.10.198',
        10001
    );


    /**
     * Scaler receiver
     */
    let client = new Client(adapter);
    client.on('message', function (message) {
        console.error(Utils.BLUE_CONSOLE, 'Message', message);
    });

    /**
     *
     */
    function getCommand() {
        prompt.get(['command'], function (err, result) {

            if (!result) {
                return;
            }

            switch (result.command) {
                case 'close' :
                    client.close();
                    console.error(Utils.GREEN_CONSOLE, 'Close application');
                    process.exit();
                    break;
                case 'selectPreset' :
                    client.sendMessage(new Message('SET_PRESET', '000002'));
                    break;
                case 'loadPreset' :
                    client.sendMessage(new Message('LOAD_PRESET', '000001'));
                    break;
                case 'setOutputD' :
                    client.sendMessage(new Message('SET_OUTPUT', '000011'));
                    break;
                case 'setOutputH' :
                    client.sendMessage(new Message('SET_OUTPUT', '000010'));
                    break;
                default:
                    console.error(Utils.RED_CONSOLE, 'Wrong command');
                    break;
            }
            getCommand();
        });
    }

    prompt.start();

    getCommand();
})();
