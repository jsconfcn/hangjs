var Metalsmith = require('metalsmith');
var assert     = require('assert');
var asset      = require('..');

describe('test', function() {
  it('should do something', function(done) {
    var metalsmith = Metalsmith('test/fixtures/one');
    metalsmith
      .use(asset())
      .build(function(err) {
        if (err) return done(err);
        done();
      });
  });
});