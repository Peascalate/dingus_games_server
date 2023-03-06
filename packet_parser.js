const {make_struct, info} = require('./util/common_util');

const packet_t = make_struct("type length values");
const operations = [];

exports.register_operation = (f, idx) => {
    operations[idx] = f;
}

// This function is actually gross but the second half is rarely used for repeated packets
exports.construct_packet = (type, value_arr) => {
    if(Buffer.isBuffer(value_arr)) {
        return Buffer.concat([Buffer.from([type]), value_arr])
    }

    var tmp = [Buffer.from([type])]
    value_arr.forEach((v) => {
        tmp.push(Buffer.from(v))
    })

    return Buffer.concat(tmp)
}

exports.broadcast = (clients, packet, exclude_id = -1) => {
    clients.forEach((v) => {
        if(v.id == exclude_id) {
            return
        }
        v.ws.send(packet);
    });
}

exports.initialize_handler = () => {
    // Fill up alloted packet space, easier for binding to specific indices rather than just pushing to the back
    operations.fill(0,0,255)
    info("Successfully initialized the packet handler")
}

exports.handle_packet = (packet, ws, clients) => {
    if (!Buffer.isBuffer(packet)) {
        // TODO: Add a warning or an error for this
        return;
    }

    var req_operation = packet[0];

    if(operations[req_operation] == 0) {
        // TODO: Add a warning or an error for this
        return;
    }

    operations[req_operation](packet, ws, clients);

}