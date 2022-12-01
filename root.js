const {autoload} = require('./autoloader')
const {client} = require('./client')
const WebSocket = require('ws');
const { initialize_parser, parse_packet } = require('./packet_parser');
const wss = new WebSocket.Server({ port: 7071 });

initialize_parser()

autoload("operations");

const clients = []



wss.on('connection', (ws) => {
    clients.push(new client(clients.length, ws, 0, [0,0,0]))
    console.log("Client Connected #" + clients.length)
    ws.on('message', (packet) => {
        parse_packet(packet,ws,clients);
    });
});