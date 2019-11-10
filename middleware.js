'use strict'

module.exports = {
    /**
     * 
     * @param {http request} req 
     * @param {http response} res 
     * @param {buffer} buf 
     * @param {string} encoding 
     * 
     * @description Converts request body to string buffer
     */
    rawBodyBuffer(req, res, buf, encoding) {
        if (buf && buf.length) {
            req.rawBody = buf.toString(encoding || 'utf8');
        }
    }
}