/**
 * GoSMS API
 * @description Functions for work with Shortener APIs.
 * @author Noltio
 * @version 1.0
 */

/**
 * Libraries
 */
const request = require('request');

/**
 * Shortener constructor
 * @param {object} auth Authentication credentials (key and secret)
 * @param {String} auth.key: API key
 * @param {String} auth.secret API secret
 * @author Noltio
 * @version 1.0
 */
function Shortener(auth) {
    if (!(this instanceof Shortener)) {
        return new Shortener(auth);
    }

    // save the authentication data
    this.auth = auth;
}

/**
 * Shorten a URL
 * @description Create shortlink for the given URL
 * @param {String} target The target URL
 * @param {function} callback Callback function
 * @author Noltio
 * @version 1.0
 */
Shortener.prototype.shorten = function shorten(target, callback) {
    request.post('https://shortener.noltio.com/api/create/', {
        form: {
            auth: this.auth,
            target: target,
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }, (err, response, body) => {
        if (err) {
            return callback(err);
        }

        // extract the data
        let data;
        try {
            data = JSON.parse(body);
        } catch (error) {
            return callback(error);
        }

        // call the callback
        callback(null, data);
    });
};

// export the shortener api
module.exports = Shortener;