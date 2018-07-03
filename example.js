/**
 * @link      https://github.com/themadbox
 * @copyright Copyright (c) Fluid Sport srl (https://www.fluidnext.com/)
 * @license   https://opensource.org/licenses/BSD-3-Clause New BSD License
 */

(function() {
    'use strict';

    const Client = require('./lib/tvone-client/Client');
    const SerialPortAdapter = require('./lib/tvone-client/adapter/SerialPortAdapter');
    const TcpAdapter = require('./lib/tvone-client/adapter/TcpAdapter');
    const Parser = require('./lib/tvone-client/parser/Parser');
    const Message = require('./lib/tvone-client/Message');
    const Utils = require('./lib/Utils');

    let prompt = require('prompt');

    let adapter = new TcpAdapter(
        '192.168.10.111',
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
