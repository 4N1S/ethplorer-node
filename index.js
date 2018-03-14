
var _ = require('underscore');
var https = require('https');
var crypto = require('crypto');
var url = require('url');
var urlencode = require('urlencode');

<<<<<<< HEAD
var ethplorer = function(key,secret,verbose) {
=======
var opendatanode = function(host,version,key,secret,verbose) {
>>>>>>> 1681db07ea3a209c440fe677a5d6898d225f4734
	this.verbose = verbose || false;
	this.version = "0.0.1";
	this.key = key;
	this.secret = secret;
	this.host = host;
	// this.host="examples.opendatasoft.com";
	this.uri = "/api/datasets/"+version+"/";
	this.baseURL = "https://opendata.bruxelles.be/";
	this.userAgent = "opendatanode-node";
	this.request_options = {
		method: 'GET',
		headers: {
			"User-Agent": "opendatanode-node",
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}
};


opendatanode.prototype.search = function(q,lang,rows,refinetype,refine,callback) {
	var params="search/?";
	if(refine !== "" && refinetype !== ""){
		params=params+'refine.'+refinetype+'='+refine+'&';
	}else{
		params='search/?';
	} 
	if(lang !== ""){
		params=params+'lang='+lang;
	}if(q !== ""){
		params=params+'&q='+q;
	}if(rows !== ""){
		params=params+'&rows='+rows;
	}
	console.log("params",params);		

	this.pubRequest(params, {}, function(err, data) {
		return callback(err, data);
	});
}
// opendatanode.prototype.getTokenInfo = function(address, callback) {
// 	this.pubRequest('getTokenInfo/' + address, {}, function(err, data) {
// 		return callback(err, data);
// 	});
// }
// opendatanode.prototype.getAddressInfo = function(address, callback) {
// 	this.pubRequest('getAddressInfo/' + address, {}, function(err, data) {
// 		return callback(err, data);
// 	});
// }
// opendatanode.prototype.getTxInfo = function(address, callback) {
// 	this.pubRequest('getTxInfo/' + address +"?apiKey=freekey", {}, function(err, data) {
// 		return callback(err, data);
// 	});
// }
// opendatanode.prototype.getTokenHistoryparam = function(apiKey,type, limit, callback) {
// 	this.pubRequest("getTokenHistory?apiKey="+apiKey+"&limit="+type+"&limit="+limit,{}, function(err, data) {
// 		return callback(err, data);
// 	});
// };


// opendatanode.prototype.getAddressHistory = function(apiKey,address,token,type, callback) {
// 	this.pubRequest('getAddressHistory/' + address +"?apiKey="+apiKey+"&token="+token+"&type="+type, {}, function(err, data) {
// 		return callback(err, data);
// 	});
// }

// opendatanode.prototype.getAddressTransactions = function(apiKey,address,limit, callback) {
// 	this.pubRequest('getAddressTransactions/' + address +"?apiKey="+apiKey+"&limit="+limit, {}, function(err, data) {
// 		return callback(err, data);
// 	});
// }

// opendatanode.prototype.getTop = function(apiKey,criteria,limit, callback) {
// 	this.pubRequest("getTop?apiKey="+apiKey+"&criteria="+criteria+"&limit="+limit+"",{}, function(err, data) {
// 		return callback(err, data);
// 	});
// }

// opendatanode.prototype.getTopTokens = function(apiKey,period,limit, callback) {
// 	this.pubRequest("getTopTokens?apiKey="+apiKey+"&period="+period+"&limit="+limit+"",{}, function(err, data) {
// 		return callback(err, data);
// 	});
// }
// opendatanode.prototype.getTokenHistoryGrouped = function(apiKey,address,period, callback) {
// 	this.pubRequest("getTokenHistoryGrouped/"+address+"?apiKey="+apiKey+"&period="+period,{}, function(err, data) {
// 		return callback(err, data);
// 	});
// }
// opendatanode.prototype.getTokenPriceHistoryGrouped = function(apiKey,address,period, callback) {
// 	this.pubRequest("getTokenPriceHistoryGrouped/"+address+"?apiKey="+apiKey+"&period="+period,{}, function(err, data) {
// 		return callback(err, data);
// 	});
// }

opendatanode.prototype.pubRequest = function(method, params, callback) {
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
				return callback(null, objFromJSON.datasets);
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

module.exports = opendatanode;
