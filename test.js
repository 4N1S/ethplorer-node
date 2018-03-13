var ethplorerClient = require('ethplorer-node');
// Public API
var api_key="freekey";
var client = new ethplorerClient();

var limit="5";
// client.getTokenHistory(limit,function (error, data) {
// 	if(error) console.log("E!",error)
// 	// console.dir(data);
// });

//type:# operation type (transfer, approve, issuance, mint, burn, etc),
var type="transfer";
var limit="3";
// client.getTokenHistoryparam(api_key,type,limit,function (error, data) {
// 	if(error) console.log("E!",error)
// 	// console.dir(data);
// });

//type:# operation type (transfer, approve, issuance, mint, burn, etc),
var address="0x1f5006dff7e123d550abc8a4c46792518401fcaf";
var token="0xc66ea802717bfb9833400264dd12c2bceaa34a6d";
var type="transfer";
// client.getAddressHistory(api_key,address,token,type,function (error, data) {
// 	if(error) console.log("E!",error)
// 	// console.dir(data);
// });

var address="0x61c8c6d0119cdc3fffb4e49ebf0899887e49761d";
var limit=3;
// client.getAddressTransactions(api_key,address,limit,function (error, data) {
// 	if(error) console.log("E!",error)
// 	// console.dir(data);
// });
// criteria: sort tokens by criteria [optional, trade - by trade volume, cap - by capitalization, count - by operations, default = trade]
// limit:    maximum number of tokens [optional, 1 - 50, default = 50]
var criteria="cap";
var limit=3;
// client.getTop(api_key,criteria,limit,function (error, data) {
// 	if(error) console.log("E!",error)
// 	// console.dir(data);
// });

// period:  show tokens for specified days period only [optional, 30 days if not set, max. is 30 days for free API key]
// limit:   maximum number of tokens [1 - 50, default = 50]
var period=30;
var limit=50;
// client.getTopTokens(api_key,period,limit,function (error, data) {
// 	if(error) console.log("E!",error)
// 	// console.dir(data);
// });
var address="0x61c8c6d0119cdc3fffb4e49ebf0899887e49761d";
var period=7;
client.getTokenHistoryGrouped(api_key,address,period,function (error, data) {
	if(error) console.log(error)
	console.dir(data);
});