const { register_operation, broadcast, construct_packet } = require("../packet_parser")

// SHARED [0x20 -> 0x30] Party Packets
function check_party_status(packet, ws, clients) {
    // TODO: Add client-side logic for party discovery
    return;
}

exports.bind = () => {
    register_operation(check_party_status, 0x20);
}