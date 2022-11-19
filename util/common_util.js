var colors = require('colors')
function info(txt) {
    console.log(("[info]> " + txt).cyan);
}

function warn(txt) {
    console.log(("[warn]> " + txt).yellow);
}

function error(txt) {
    console.log(("[error]> " + txt).red);
}

function success(txt) {
    console.log(("[success]> " + txt).green);
}


exports.info = info;
exports.warn = warn;
exports.error = error;
exports.success = success;


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
  