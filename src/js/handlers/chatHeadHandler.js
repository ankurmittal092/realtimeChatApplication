var $ = require('jquery');
var chatPanelHandler = require('./chatPanelHandler');
var chatDataStore = require('../dataStore/chatDataStore');

var $chatListWrpJS = $($('.chatListWrpJS')[0]);

var fnHandleActiveClass = function(chatHeadClickedID) {
	var chatheadArr = $chatListWrpJS.find('.chat-itme-wrp');
	
	for(var i=0; i<chatheadArr.length; i++){
		var elem = chatheadArr[i];
		if(elem.getAttribute('data-id') == chatHeadClickedID){
			elem.classList.add('active');
		}
		else {
			elem.classList.remove('active');
		}
	}
};

var init = function () {	
	$chatListWrpJS.on( "click", ".chat-itme-wrp", function() {
		
		var chatHeadClickedID = this.getAttribute('data-id');
		fnHandleActiveClass(chatHeadClickedID);
		chatPanelHandler.populateChats(chatHeadClickedID);
	});

	//creating chat heads
	var chatList = chatDataStore.getFriendsList();
	Object.keys(chatList).map(function(elem, index){
		var obj = chatList[elem];
		var chatHead = createChatHead(obj);
		$chatListWrpJS.append(chatHead);
	});
};

var createChatHead = function(elem){
	return $('<div class="chat-itme-wrp" data-id="' + elem.id + '">'+elem.name+'</div>');
};

module.exports = {
	init: init,
	createChatHead: createChatHead
}