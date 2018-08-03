var exec = require('child_process').exec;
var limitdctl = __dirname + '/../bin/limitdctl';
var assert = require('chai').assert;

describe('take', function () {

  it('should fail if bucket is missing', function (done) {
    exec(limitdctl + ' --key 127.0.0.1 --take 1', function (err, stdout, stderr) {
      assert.include(stderr, '"--bucket" is required');
      done();
    });
  });

  it('should fail if key is missing', function (done) {
    exec(limitdctl + ' --bucket ip --take 1', function (err, stdout, stderr) {
      assert.include(stderr, '"--key" is required');
      done();
    });
  });

  it('should fail if method is missing', function (done) {
    exec(limitdctl + ' --bucket ip --key 127.0.0.1', function (err, stdout, stderr) {
      assert.include(stderr, 'one and only one method must be provided "--take", "--wait", "--put" or "--status"');
      done();
    });
  });

  it('can take tokens', function (done) {
    exec(limitdctl + ' --bucket ip --key 127.0.0.1 --take 1', function (err, stdout, stderr) {
      assert.equal(stdout, 'Conformant - Remaining: 9\n');
      done(err);
    });
  });

  it('should fail when there is not enough tokens', function (done) {
    exec(limitdctl + ' --bucket ip --key 127.0.0.29 --take 12', function (err, stdout, stderr) {
      assert.equal(stderr, 'Non conformant! - Current: 10\n');
      done();
    });
  });

  it('can take tokens and return json output', function (done) {
    exec(limitdctl + ' --bucket ip --key 127.0.0.2 --take 1 --json', function (err, stdout, stderr) {
      var result = JSON.parse(stdout);
      assert.ok(result.conformant);
      assert.equal(result.remaining, 9);
      done(err);
    });
  });

});
