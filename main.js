/**
 * @link      https://github.com/themadbox
 * @copyright Copyright (c) Fluid Sport srl (https://www.fluidnext.com/)
 * @license   https://opensource.org/licenses/BSD-3-Clause New BSD License
 */

(function() {
    'use strict';

    module.exports = {
        Client : require('./lib/tvone-client/Client'),
        SerialAdapter : require('./lib/tvone-client/adapter/SerialPortAdapter'),
        TcpAdapter : require('./lib/tvone-client/adapter/TcpAdapter'),
        Message : require('./lib/tvone-client/Message')
    };

})();