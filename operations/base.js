const { register_operation, broadcast, construct_packet } = require("../packet_parser")
const { error, info, warn, make_struct } = require("../util/common_util")

const resync_info = make_struct("id username pos rot fsid sktid")

// SERVER [0x00 -> 0x10] Base Packets

// (SERVER:0x00) - New client packet (establish name)
// Returns (CLIENT:0x01 - NEW PAWN)
function new_client(packet, ws, clients) {
    // Gross but easier in godot then having a length
    var len = packet[4]
    var sktid = packet[3]
    var fsid = packet[2]
    var id = packet[1]
    if(len > 20) {
        warn("Username for Client #"+id+" too long, dropping packet!")
        return
    }
    var username = packet.subarray(5,len+3)
    clients[id].uname = username.toString()
    clients[id].fsid = fsid
    clients[id].sktid = sktid
    var pkt = construct_packet(0x01, [[id, fsid, sktid], username])
    broadcast(clients, pkt, id)
}

function resync_game(packet,ws,clients) {
    var id = packet[1]
    var resync_data = []
    clients.forEach((v) => {
        if(v.id == id) {
            return
        }
        resync_data.push(new resync_info(v.id, v.uname, v.pos, v.rot, v.fsid, v.sktid))
    });
    var pkt = construct_packet(0x05, [JSON.stringify(resync_data)])
    ws.send(pkt)
}

exports.bind = (g) => {
    register_operation(new_client,0x00)
    register_operation(resync_game,0x05)
}