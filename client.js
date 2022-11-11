const {make_struct} = require('./util/common_util')

const client = make_struct("id ws state pos")

exports.client = client;