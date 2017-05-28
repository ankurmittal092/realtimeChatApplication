var $ = require('jquery');
var chatDataStore = require('../dataStore/chatDataStore');
var websocketsSvc = require('../services/websocketsSvc');

var chatDataStore = require('../dataStore/chatDataStore');

var $chatPanelJS = $($('.chatPanelJS')[0]);
var $chatPanelContJS = $($('.chatPanelContJS')[0]);
var $sendMessageInput = $($('#sendMessageInput'));

var populateChats = function(id){
	$chatPanelContJS.show();
	
	if(chatDataStore.getCurrentActiveChat()!= id){
		debugger;
		$chatPanelJS.html('');
		chatDataStore.setCurrentActiveChat(id);

		var chatDataByID = chatDataStore.getChatDataByID(id) || [];
		for(var i=0; i<chatDataByID.length; i++){
			var elem = chatDataByID[i] || {};

			if(elem.type == 'in'){
				createIncomingMessage(elem.msg);
			} else {
				createOutgoingMessage(elem.msg);
			}
		}
	}
};

var fnGenerateMessageObj = function(message, type){
	return {
		'id': chatDataStore.getCurrentActiveChat(), 
		'msg': message,
		'type': type
	}
};

var createIncomingMessage = function(message){
	var messageDOM = $('<div class="clearfix">\
			        <div class="msg-in">'+ message +'</div>\
			      </div>');

	$chatPanelJS.append(messageDOM);
};

var createOutgoingMessage = function(message){
	var messageDOM = $('<div class="clearfix">\
			        <div class="msg-out">'+ message +'</div>\
			      </div>');
	
	$chatPanelJS.append(messageDOM);
};

var handleIncomingMessage = function(event){
	var data = JSON.parse(event.data);
	data.type = 'in';
	
	chatDataStore.addChatData(data);

	createIncomingMessage(data.msg);
};

var handleOutGoingMessage = function(message){
	var msgObj = fnGenerateMessageObj(message, 'out');
	websocketsSvc.sendMessage(JSON.stringify(msgObj));

	chatDataStore.addChatData(msgObj);
	createOutgoingMessage(message);
};

var sendMessageInputKeyupHandler = function(event){
	var inputValue = event.target.value;
	if(event && event.keyCode == 13 && inputValue){
		handleOutGoingMessage(inputValue);
		event.target.value = '';
	}
};

var init = function () {
	$chatPanelContJS.hide();
	$sendMessageInput.on('keyup', sendMessageInputKeyupHandler);
};

module.exports = {
	init: init,
	handleIncomingMessage: handleIncomingMessage,
	populateChats: populateChats
}