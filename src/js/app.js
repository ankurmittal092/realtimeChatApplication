// console.log('testing if this worksss');
var $ = require('jquery');
var websocketsSvc = require('./services/websocketsSvc');
var statusBarHandler = require('./handlers/statusBarHandler');

function onOpen(evt) {
	statusBarHandler.manageStates("CONNECTED");
	websocketsSvc.sendMessage('hello world', writeToScreen);
}

function onClose(evt) {
	statusBarHandler.manageStates("DISCONNECTED");
}

function onMessage(evt) {
	writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
	/*setTimeout(function(){
		websocketsSvc.closeSocket();
	}, 5000);*/
}

function onError(evt) {
	statusBarHandler.manageStates("ERROR");
}

function writeToScreen(message) {
 	console.log(message)
}

statusBarHandler.manageStates("CONNECTING");
$(document).ready(websocketsSvc.init(onOpen, onClose, onMessage, onError));