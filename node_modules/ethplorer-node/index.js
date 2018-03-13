
var _ = require('underscore');
var https = require('https');
var crypto = require('crypto');
var url = require('url');
var urlencode = require('urlencode');

var ethplorer = function(key, secret, verbose) {
	this.verbose = verbose || false;
	this.version = "0.0.1";
	this.key = key;
	this.secret = secret;
	this.host = "api.ethplorer.io";
	this.uri = "/";
	this.baseURL = "https://api.ethplorer.io/";
	this.userAgent = "ethplorer-node";
	this.request_options = {
		method: 'GET',
		headers: {
			"User-Agent": "ethplorer-node",
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}
};

// Public API

ethplorer.prototype.getTokenHistory = function(limit,callback) {
		this.pubRequest('getTokenHistory?apiKey=freekey&limit='+limit+'', {}, function(err, data) {
		return callback(err, data);
	});
}

ethplorer.prototype.getTokenInfo = function(address, callback) {
	this.pubRequest('getTokenInfo/' + address, {}, function(err, data) {
		return callback(err, data);
	});
}
ethplorer.prototype.getAddressInfo = function(address, callback) {
	this.pubRequest('getAddressInfo/' + address, {}, function(err, data) {
		return callback(err, data);
	});
}
ethplorer.prototype.getTxInfo = function(address, callback) {
	this.pubRequest('getTxInfo/' + address +"?apiKey=freekey", {}, function(err, data) {
		return callback(err, data);
	});
}
ethplorer.prototype.getTokenHistoryparam = function(apiKey,type, limit, callback) {
	this.pubRequest("getTokenHistory?apiKey="+apiKey+"&limit="+type+"&limit="+limit,{}, function(err, data) {
		return callback(err, data);
	});
};


ethplorer.prototype.getAddressHistory = function(apiKey,address,token,type, callback) {
	this.pubRequest('getAddressHistory/' + address +"?apiKey="+apiKey+"&token="+token+"&type="+type, {}, function(err, data) {
		return callback(err, data);
	});
}

ethplorer.prototype.getAddressTransactions = function(apiKey,address,limit, callback) {
	this.pubRequest('getAddressTransactions/' + address +"?apiKey="+apiKey+"&limit="+limit, {}, function(err, data) {
		return callback(err, data);
	});
}

ethplorer.prototype.getTop = function(apiKey,criteria,limit, callback) {
	this.pubRequest("getTop?apiKey="+apiKey+"&criteria="+criteria+"&limit="+limit+"",{}, function(err, data) {
		return callback(err, data);
	});
}

ethplorer.prototype.getTopTokens = function(apiKey,period,limit, callback) {
	this.pubRequest("getTopTokens?apiKey="+apiKey+"&period="+period+"&limit="+limit+"",{}, function(err, data) {
		return callback(err, data);
	});
}
ethplorer.prototype.getTokenHistoryGrouped = function(apiKey,address,period, callback) {
	this.pubRequest("getTokenHistoryGrouped/"+address+"?apiKey="+apiKey+"&period="+period,{}, function(err, data) {
		return callback(err, data);
	});
}
ethplorer.prototype.getTokenPriceHistoryGrouped = function(apiKey,address,period, callback) {
	this.pubRequest("getTokenPriceHistoryGrouped/"+address+"?apiKey="+apiKey+"&period="+period,{}, function(err, data) {
		return callback(err, data);
	});
}

ethplorer.prototype.pubRequest = function(method, params, callback) {
	var options = {
	  hostname: this.host,
	  path: this.uri + method,
	  port: 443,
	  method: 'GET',
	  verbose: this.verbose
	};
	console.log(options.path);
	cb = function(response) {
		var str = '';
		response.on('data', function (chunk) {
			str += chunk;
			if (options.verbose) console.log(str);
		});
		response.on('end', function () {
			var objFromJSON;
			try {
				objFromJSON = JSON.parse(str);
				return callback(null, objFromJSON);
			}
			catch (err) {
				return callback(err, null);
			}
		});
	}
	var req = https.request(options, cb);
	req.on('error', function(err) {
		callback(err, null);
	});

	req.end();

};

module.exports = ethplorer;
