/**
 * @link      https://github.com/themadbox
 * @copyright Copyright (c) Fluid Sport srl (https://www.fluidnext.com/)
 * @license   https://opensource.org/licenses/BSD-3-Clause New BSD License
 */

(function() {
    'use strict';

    module.exports = {
        Client : require('./lib/Client'),
        SerialAdapter : require('./lib/adapter/SerialPortAdapter'),
        TcpAdapter : require('./lib/adapter/TcpAdapter'),
        Message : require('./lib/Message')
    };

})();