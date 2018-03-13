var ethplorerClient = require('ethplorer-node');
// Public API
var api_key="freekey";
var client = new ethplorerClient();
var limit = 3;
client.getTokenHistory(limit,function (error, data) {
	if(error) console.log("E!",error)
	console.dir(data);
});