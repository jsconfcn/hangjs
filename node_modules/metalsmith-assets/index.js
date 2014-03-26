/**
 * Module Dependencies.
 */

var ncp   = require('ncp').ncp;
var path  = require('path');


/**
 * Module Exports
 */

module.exports = function(dir) {
  if (!dir) dir = 'assets';
  return function(files, metalsmith, done) {
    var src = path.join(metalsmith.dir, dir);
    ncp(src, path.join(metalsmith.dir, metalsmith._dest, dir), function(err) {
      if (err) return done(err);
      done();
    });
  };
};
