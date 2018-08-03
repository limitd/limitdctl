var LimitdServer = require('limitd').Server;
var rimraf = require('rimraf');
var db = __dirname + '/db';

module.exports = {
  start: function (port, db, callback) {
    rimraf.sync(db);
    const server = new LimitdServer({
      db: db,
      port: port,
      buckets: {
        ip: {
          per_minute: 10
        }
      }
    });

    server.start((err) => callback(err, server));
  }
};
