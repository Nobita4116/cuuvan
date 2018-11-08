'use strict'

var jsSHA = require("jssha");

module.exports = {
	hashSecret: (message, key) => {
		let shaObj = new jsSHA("SHA-256", "TEXT");
		shaObj.setHMACKey(key, "HEX");
		shaObj.update(message);
		let hmac = shaObj.getHMAC("HEX");

		return hmac.toUpperCase();
	}
}