const {make_struct} = require('./util/common_util.js');

const packet_t = make_struct("type length values");
const operations = [];

exports.register_operation = function(f) {
    operations.push(f)
}


exports.parse_packet = function (packet) {
    if(!packet.isBuffer()) {
        // TODO: Add a warning or an error for this
        return;
    }

    var req_operation = packet[0];

    // Invald Operation
    if(req_operation >= operations.length) {
        // TODO: Add a warning or an error for this
        return;
    }
}