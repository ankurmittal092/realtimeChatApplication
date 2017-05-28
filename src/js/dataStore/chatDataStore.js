var friendsList = require('../statics/friendsList');
var storeData = {
	friendsList: friendsList,
	currentActiveChat: null,
	chatData: {}
};

var getFriendsList = function () {
	return storeData.friendsList;
};

var getCurrentActiveChat = function(){
	return storeData.currentActiveChat;
};

var setCurrentActiveChat = function(val){
	storeData.currentActiveChat = val;
};

var addChatData = function(data){
	var chatDataById = storeData.chatData[data.id || getCurrentActiveChat()];
	if(chatDataById){
		chatDataById.push(data);
	}
	else {
		storeData.chatData[data.id || getCurrentActiveChat()] = [data];
	}
};

var getChatDataByID = function(id){
	return storeData.chatData[id];
};

module.exports = {
	getFriendsList: getFriendsList,
	getCurrentActiveChat: getCurrentActiveChat,
	setCurrentActiveChat: setCurrentActiveChat,
	addChatData: addChatData,
	getChatDataByID: getChatDataByID
};
