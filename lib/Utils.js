/**
 * @link      https://github.com/themadbox
 * @copyright Copyright (c) Fluid Sport srl (https://www.fluidnext.com/)
 * @license   https://opensource.org/licenses/BSD-3-Clause New BSD License
 */

class Utils {

    static get GREEN_CONSOLE() {
        return '\x1b[32m%s\x1b[0m'
    };

    static get RED_CONSOLE() {
        return '\x1b[31m%s\x1b[0m'
    };

    static get BLUE_CONSOLE() {
        return '\x1b[34m%s\x1b[0m'
    };

}

module.exports = Utils;