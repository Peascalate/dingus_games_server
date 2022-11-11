var glob = require( 'glob' ), path = require( 'path' );

exports.autoload = function(d) {
    glob.sync( './'+d+'/**/*.js' ).forEach( function( file ) {
        try {
            require( path.resolve( file ) ).bind();
        }
        catch {
            console.log("Could not load " + file + "!");
        }
    });
}