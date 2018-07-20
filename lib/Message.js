/**
 * @link      https://github.com/themadbox
 * @copyright Copyright (c) Fluid Sport srl (https://www.fluidnext.com/)
 * @license   https://opensource.org/licenses/BSD-3-Clause New BSD License
 */

class Message {

    static get START_CHARACTER() {
        return 'F'
    } ;

    static get END_CHARACTER() {
        return '\r'
    } ;

    static get LIST_FUNCTION() {
        return {
            'SET_PRESET': {
                FIRST: '2',
                LAST: '25'
            },
            'LOAD_PRESET': {
                FIRST: '2',
                LAST: '26'
            },
            'SET_SOURCE': {
                FIRST: '0',
                LAST: '82'
            }
        }
    } ;

    constructor(type, body) {

        if (typeof body !== 'string' || body.length !== 6) {
            throw 'Wrong body param';
        }

        if (typeof body !== 'string' || Message.LIST_FUNCTION[type] === undefined) {
            throw 'Wrong type param';
        }

        /**
         * Default to send message
         *
         * @type {string}
         */
        this.cmd = '04';

        /**
         * Default HDMI
         *
         * @type {string}
         */
        this.cha = '10';

        /**
         * Logo
         *
         * @type {string}
         */
        this.logo = '41';

        /**
         *
         * @type {string}
         */
        this.setFLow(type);

        /**
         *
         * @type {string}
         */
        this.setFHight(1, type);

        /**
         * @type {string}
         */
        this.body = body;

        /**
         * @type {boolean}
         */
        this.debug = false;
    }

    /**
     * @param type
     * @param body
     * @return {string}
     */
    getStringMessage() {

        return `${Message.START_CHARACTER}${this.cmd}${this.cha}${this.logo}${this.fHigh}${this.fLow}${this.body}${this._calcCheckSum()}${Message.END_CHARACTER}`;
    }

    /**
     *
     * @param fHight
     * @param type
     * @return {string}
     */
    setFHight(fHight = 1, type) {
        let secondChar = '';
        switch (true) {
            case Message.LIST_FUNCTION[type] !== undefined :
                secondChar = Message.LIST_FUNCTION[type].FIRST;
                break;
            default:
                throw 'Wrong type message';
                break
        }

        this.fHigh = fHight + secondChar;
    }

    /**
     *
     * @param fHight
     * @param type
     * @return {string}
     */
    setFLow(type) {

        let fLow = '';

        switch (true) {
            case Message.LIST_FUNCTION[type] !== undefined :
                fLow = Message.LIST_FUNCTION[type].LAST;
                break;
            default:
                throw 'Wrong type message';
                break
        }

        this.fLow = fLow;
    }

    /**
     * @param type
     * @param body
     * @return {*}
     * @private
     */
    _calcCheckSum(type, body) {

        if (this.debug) {
            return '??';
        }

        let sum = parseInt(this.cmd, 16) +
            parseInt(this.cha, 16) +
            parseInt(this.logo, 16) +
            parseInt(this.fHigh, 16) +
            parseInt(this.fLow, 16) +
            parseInt(this.body.substring(0, 2), 16) +
            parseInt(this.body.substring(2, 4), 16) +
            parseInt(this.body.substring(4, 6), 16)
        ;

        sum = sum.toString(16);

        switch (true) {
            case sum.length === 1:
                sum = '0' + sum;
                break;
            case sum.length > 2:
                sum = sum.substring(sum.length - 2, sum.length);
                break;
        }

        return sum;
    }
}


module.exports = Message;