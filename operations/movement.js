const { register_operation, broadcast,construct_packet } = require("../packet_parser")

// 0x02
function move_relative(packet, ws, clients) {
    var pkt = construct_packet(0x02, packet)
    console.log("Packet Data: " + pkt)
}

exports.bind = () => {
    register_operation(move_relative,0x02)
}