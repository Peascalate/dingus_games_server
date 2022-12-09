var colors = require('colors')

// These look aweful right now
// These will eventually store info on disk, rn it's just pretty console output
exports.info = (txt) => {
    console.log(("[info]> " + txt).cyan);
}

exports.warn = (txt) => {
    console.log(("[warn]> " + txt).yellow);
}

exports.error = (txt) => {
  console.log(("[error]> " + txt).red);
}

exports.success = (txt) => {
    console.log(("[success]> " + txt).green);
}


exports.make_struct = function(names) {
    var names = names.split(' ');
    var count = names.length;
    function constructor() {
      for (var i = 0; i < count; i++) {
        this[names[i]] = arguments[i];
      }
    }
    return constructor;
  }
  