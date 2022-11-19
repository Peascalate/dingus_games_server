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
    console.log("Client Connected #" + clients.length)
    ws.on('message', (messageAsString) => {
        console.log(messageAsString)
        broadcast(messageAsString)
    });
});