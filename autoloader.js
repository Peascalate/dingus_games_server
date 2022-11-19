var glob = require( 'glob' ), path = require( 'path' );
const {info, error} = require("./util/common_util")

exports.autoload = function(d) {
    glob.sync( './'+d+'/**/*.js' ).forEach( function( file ) {
        try {
            require( path.resolve( file ) ).bind();
            info("Bound all packet handlers from " + file)
        }
        catch {
            error("Failed to bind packet handlers from " + file + "!");
        }
    });
}