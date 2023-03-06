# Dingus Game Server

A little WIP weird modular portable game server using websockets.

## Features

* PnP-style gamemode hotswapping
* Autoloader for packet configurations
* Modularized system to allow for easy modification of default packet behavior and the addition of new packets

## Installation

`npm i`

## Running

`node ./root.js`
## Defining Packet Behavior
Create a new file in the operations folder, this will be autoloaded later so there's no need to register it anywhere
```js
// Helper Functions
const { register_operation, broadcast, construct_packet } = require("../packet_parser")

// Example of an admin style command
// Params follow as such (packet: Buffer, ws: WebSocket, clients: Array<clients>)
function strip_player_inventory_req(packet, ws, clients) {
    var issuing = packet[1];
    var target = packet[2];
    if(clients[issuingid].state != "ADMIN") {
        return;
    }
    // Construct the packet
    // Params follow as such (type: UInt8, values: Array<Variant>)
    var pkt = construct_packet(0xf8,[issuingid]);
    // Issue the strip inventory packet to the client
    clients[target].ws.send(pkt);
}

// Bind function, register packet definitions here
exports.bind = () => {
    // Registers the packet definition to the packet handler
    // Params follow as such (f: Function, idx: UInt8)
    register_operation(strip_player_inventory_req, 0xf8);
}
```