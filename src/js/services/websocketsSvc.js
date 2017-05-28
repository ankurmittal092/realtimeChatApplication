var wsUri = "ws://echo.websocket.org/";
var output;

function init(onOpen, onClose, onMessage, onError) {
    output = document.getElementById("output");
    testWebSocket(onOpen, onClose, onMessage, onError);
}

function testWebSocket(onOpen, onClose, onMessage, onError) {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  websocket.onerror = function(evt) { onError(evt) };
}

function closeSocket(){
  websocket.close();
};

function sendMessage(message, callback) {
  websocket.send(message);
  callback(message);
}

module.exports = {
  init: init, 
  sendMessage: sendMessage,
  closeSocket: closeSocket
}