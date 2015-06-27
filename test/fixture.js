var LimitdServer = require('limitd').Server;
var rimraf = require('rimraf');
var db = __dirname + '/db';

module.exports = {
  start: function (callback) {
    rimraf.sync(db);
    this.server = new LimitdServer({
      db: db,
      buckets: {
        ip: {
          per_minute: 10
        }
      }
    });
    this.server.start(callback);
  },
  stop: function () {
    if (this.server) {
      this.server.stop();
      delete this.server;
    }
  }
};
