var $ = require('jquery');
var chatPanelHandler = require('./chatPanelHandler');
var chatDataStore = require('../dataStore/chatDataStore');

var $chatListWrpJS = $($('.chatListWrpJS')[0]);
var $searchFriendsInput = $($('#searchFriendsInput'));

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

var handleSearchFriendsInputKeypup = function(event){
	
	var filter = $(this).val(); 
    // Loop through the comment list
    $(".chat-itme-wrp").each(function(){

        // If the list item does not contain the text phrase fade it out
        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
            $(this).fadeOut();

        // Show the list item if the phrase matches and increase the count by 1
        } else {
            $(this).show();
        }
    });
};

var init = function () {	
	$chatListWrpJS.on( "click", ".chat-itme-wrp", function() {
		
		var chatHeadClickedID = this.getAttribute('data-id');
		fnHandleActiveClass(chatHeadClickedID);
		chatPanelHandler.populateChats(chatHeadClickedID);
	});

	$searchFriendsInput.on("keyup", handleSearchFriendsInputKeypup)

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