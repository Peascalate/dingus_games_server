const {autoload} = require('./autoloader')
const {client} = require('./client')
const WebSocket = require('ws');
const { handle_packet, initialize_handler } = require('./packet_parser');
const wss = new WebSocket.Server({ port: 7071 });

initialize_handler()

autoload("operations");
require("./gamemodes/gm_dodgeball").bind()

const max_players = 4
const clients = []

wss.on('connection', (ws) => {
    clients.push(new client(clients.length, ws, "", 0, [0, 0, 0], [0, 0, 0], 0, 0))
    ws.send(Buffer.from([0x00,clients.length - 1]))
    ws.on('message', (packet) => {
        handle_packet(packet,ws,clients);
    });
});