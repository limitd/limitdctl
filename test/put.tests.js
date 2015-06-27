var exec = require('child_process').exec;
var limitdctl = __dirname + '/../bin/limitdctl';
var assert = require('chai').assert;

describe('put', function () {

  it('can put tokens', function (done) {
    exec(limitdctl + ' --bucket ip --key 192.0.0.1 --take 5', function (err, stdout, stderr) {
      exec(limitdctl + ' --bucket ip --key 192.0.0.1 --put 2', function (err, stdout, stderr) {
        assert.equal(stdout, 'OK - Current: 7\n');
        done(err);
      });
    });
  });

});