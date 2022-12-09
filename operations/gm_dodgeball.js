const { register_operation, broadcast, construct_packet } = require("../packet_parser")

// SERVER [0x80 -> 0xA0] Gamemode Specific Packets

function throw_dodgeball(packet, ws, clients) {
    return
}

exports.bind() = () => {
    register_operation(throw_dodgeball,0x83);
}