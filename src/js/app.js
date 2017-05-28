// console.log('testing if this worksss');
var $ = require('jquery');
var websocketsSvc = require('./services/websocketsSvc');
var statusBarHandler = require('./handlers/statusBarHandler');
var chatHeadHandler = require('./handlers/chatHeadHandler');
var chatPanelHandler = require('./handlers/chatPanelHandler');

function onOpen(evt) {
	statusBarHandler.manageStates("CONNECTED");
}

function onClose(evt) {
	statusBarHandler.manageStates("DISCONNECTED");
}

function onMessage(evt) {
	chatPanelHandler.handleIncomingMessage(evt);
}

function onError(evt) {
	statusBarHandler.manageStates("ERROR");
}

statusBarHandler.manageStates("CONNECTING");
$(document).ready(function(){
	websocketsSvc.init(onOpen, onClose, onMessage, onError); //initiate web sockets
	chatHeadHandler.init();
	chatPanelHandler.init();
});