const { register_operation, broadcast, construct_packet } = require("../packet_parser")

// SHARED [0x10 -> 0x20] Movement Packets 

// (SHARED:0x10) - Move Pawn Relative (includes Y rotation)
// Returns (SHARED:0x10 - Move Pawn Relative)
function move_relative(packet, ws, clients) {
    var id = packet[1]
    broadcast(clients,packet,id) // Echo
    var client = clients[id]
    client.pos[0] += packet.readFloatLE(6)
    client.pos[1] += packet.readFloatLE(6+4)
    client.pos[2] += packet.readFloatLE(6+8)
    client.rot[1] += packet.readFloatLE(6+16)
}

exports.bind = () => {
    register_operation(move_relative,0x10)
}