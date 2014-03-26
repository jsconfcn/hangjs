
var exec = require('child_process').exec;
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var permalinks = require('..');

describe('metalsmith-permalinks', function(){
  before(function(done){
    exec('rm -rf test/fixtures/*/build', done);
  });

  it('should change files even with no pattern', function(done){
    Metalsmith('test/fixtures/no-pattern')
      .use(permalinks())
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/no-pattern/expected', 'test/fixtures/no-pattern/build');
        done();
      });

  });

  it('should replace a pattern', function(done){
    Metalsmith('test/fixtures/pattern')
      .use(permalinks({ pattern: ':title' }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/pattern/expected', 'test/fixtures/pattern/build');
        done();
      });

  });

  it('should accepts a shorthand string', function(done){
    Metalsmith('test/fixtures/shorthand')
      .use(permalinks(':title'))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/shorthand/expected', 'test/fixtures/shorthand/build');
        done();
      });

  });

  it('should copy relative files to maintain references', function(done){
    Metalsmith('test/fixtures/relative')
      .use(permalinks())
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/relative/expected', 'test/fixtures/relative/build');
        done();
      });
  });

  it('should copy relative files even with patterns', function(done){
    Metalsmith('test/fixtures/relative-pattern')
      .use(permalinks(':title'))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/relative-pattern/expected', 'test/fixtures/relative-pattern/build');
        done();
      });
  });

  it('should format a date', function(done){
    Metalsmith('test/fixtures/date')
      .use(permalinks(':date'))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/date/expected', 'test/fixtures/date/build');
        done();
      });

  });

  it('should format a date with a custom formatter', function(done){
    Metalsmith('test/fixtures/custom-date')
      .use(permalinks({
        pattern: ':date',
        date: 'YYYY/MM'
      }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/custom-date/expected', 'test/fixtures/custom-date/build');
        done();
      });

  });
});