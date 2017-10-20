var exec = require('child_process').exec;
var limitdctl = __dirname + '/../bin/limitdctl';
var assert = require('chai').assert;
var fixture = require('./fixture');

describe('shard support', function() {
  var server1;
  var server2;

  describe('using host options', () => {
    before((done) => {
      fixture.start(9232, 'test/db.1', (err, iserver1) => {
        if (err) { return done(err); }

        server1 = iserver1;

        fixture.start(9233, 'test/db.2', (err, iserver2) => {
          if (err) { return done(err); }

          server2 = iserver2;

          done();
        });
      });
    });

    after(() => {
      server1.stop();
      server2.stop();
    });

    const SHARD_PARAMS = '--shard --hosts limitd://127.0.0.1:9233,limitd://127.0.0.1:9232';

    it('can put tokens to the shard', function (done) {
      exec(limitdctl + ` ${SHARD_PARAMS} --bucket ip --key k1 --take 5`, function (err, stdout, stderr) {
        if (err) { return done(err); }

        exec(limitdctl + ` ${SHARD_PARAMS} --bucket ip --key k1 --put 2`, function (err, stdout, stderr) {
          assert.equal(stdout, 'OK - Current: 7\n');
          done(err);
        });
      });
    });

    it('can take tokens from the shard', function (done) {
      exec(limitdctl + ` ${SHARD_PARAMS} --bucket ip --key k2 --take 1`, function (err, stdout, stderr) {
        assert.equal(stdout, 'Conformant - Remaining: 9\n');
        done(err);
      });
    });

    it('can get status from the shard', function (done) {
      this.timeout(4000)
      exec(limitdctl + ` ${SHARD_PARAMS} --bucket ip --key k3-1 --take 1`, function (err, stdout, stderr) {
        if (err) { return done(err); }

        exec(limitdctl + ` ${SHARD_PARAMS} --bucket ip --key k3-2 --take 1`, function (err, stdout, stderr) {
          if (err) { return done(err); }

          exec(limitdctl + ` ${SHARD_PARAMS} --bucket ip --key k3- --status --json`, function (err, stdout, stderr) {
            if (err) { return done(err); }

            const parsed = JSON.parse(stdout).items;

            assert.equal(parsed[0].instance, 'k3-1');
            assert.equal(parsed[0].remaining, '9');
            assert.equal(parsed[0].limit, '10');

            assert.equal(parsed[1].instance, 'k3-2');
            assert.equal(parsed[1].remaining, '9');
            assert.equal(parsed[1].limit, '10');

            done(err);
          });
        });
      });
    });
  });

  // It would be great to have integration tests for autodiscover but that
  // would require a dns record
});
