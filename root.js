const {autoload} = require('./autoloader.js')
const {client} = require('./client.js')
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 7071 });

autoload("operations");

const clients = []

function broadcast(m) {
    clients.forEach((v) => {
        v.ws.send(m);
    });
}


wss.on('connection', (ws) => {
    clients.push(new client(clients.length, ws, 0, [0,0,0]))
    ws.send("connected");
    ws.on('message', (messageAsString) => {
        if(messageAsString[0] == 0x00) {
            broadcast(0x01)
        }
    });
});