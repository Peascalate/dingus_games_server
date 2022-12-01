const {make_struct, info} = require('./util/common_util');

const packet_t = make_struct("type length values");
const operations = [];

exports.register_operation = (f, idx) => {
    operations[idx] = f;
}

exports.construct_packet = (type, value_arr) => {
    return Buffer.from(type + value_arr)
}

exports.broadcast = (clients) => {
    clients.forEach((v) => {
        v.ws.send(m);
    });
}

exports.initialize_parser = () => {
    // Fill up alloted packet space, easier for binding to certain indices
    for(var i = 0; i < 255; i++) {
        this.register_operation(() => {}, i);
    }
    info("Successfully initialized the packet parser")
}

exports.parse_packet = (packet, ws, clients) => {
    if (!Buffer.isBuffer(packet)) {
        // TODO: Add a warning or an error for this
        return;
    }

    var req_operation = packet[0];

    // COMMENTED OUT BECAUSE INVALID STRUCTURE ATMMMMMM
    // Invald Operation
    // if(req_operation >= operations.length) {
    //     // TODO: Add a warning or an error for this
    //     return;
    // }
    console.log(req_operation);
    console.log(operations);

    operations[req_operation](packet.subarray(1), ws, clients);

}