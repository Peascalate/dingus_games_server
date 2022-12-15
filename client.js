const {make_struct} = require('./util/common_util')

const client = make_struct("id ws uname state pos rot fsid sktid")

exports.client = client;