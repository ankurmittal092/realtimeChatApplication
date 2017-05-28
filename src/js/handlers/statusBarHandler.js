var $ = require('jquery');
var $statusBarJS = $($('.statusBarJS')[0]);
var statesConfigObj = {
	'CONNECTING': {
		textColor: '#687584',
		statusMessage: 'Connecting.. Please wait!'
	},

	'CONNECTED': {
		textColor: '#3f968f',
		statusMessage: 'Connected!',
		fadeOut: true
	},

	'DISCONNECTED': {
		textColor: '#C7425D',
		statusMessage: 'Disconnected. Kindly refresh your browser'
	},

	'ERROR': {
		textColor: '#C7425D',
		statusMessage: 'Some Error occured. Kindly refresh your browser'
	}
}
var fadeOut = function(time){
	$statusBarJS.fadeOut(time || 500);
};

var manageStates = function(state){
	var configObj =  statesConfigObj[state];
	
	$statusBarJS.show();
	$statusBarJS.text(configObj.statusMessage);
	$statusBarJS.css('color', configObj.textColor);

	if(configObj.fadeOut){
		fadeOut();
	}

};

module.exports = {
	fadeOut: fadeOut,
	manageStates: manageStates
}