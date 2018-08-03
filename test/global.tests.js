var fixture = require('./fixture');
var server;

before((done) => {
  fixture.start(9231, 'test/db.0', (err, iserver) => {
    if (err) { return done(err); }

    server = iserver;
    done();
  });
});

after(() => server && server.stop());
