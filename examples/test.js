var ethplorerClient = require('../index.js');
// Public API
var api_key="freekey";
var client = new ethplorerClient(api_key);
var limit="5";
client.getTokenHistory(limit,function (error, data) {
	if(error) console.log("E!",error)
	console.dir(data);
});

var criteria="cap";
var limit="5";
client.getTop(api_key,criteria,limit,function (error, data) {
	if(error) console.log("E!",error)
	console.dir(data);
});

var tx="0x6aa670c983425eba23314459c48ae89b3b8d0e1089397c56400ce2da5ece9d26";
client.getTxInfo(tx,function (error, data) {
	if(error) console.log("E!",error)
	console.dir(data);
});
