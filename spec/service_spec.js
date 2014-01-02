var request = require('supertest');
var assert = require('assert');

describe('pygments-service', function() {
  var app;
  before(function() {
    app = require('../service').app;
  });

  it('should respond to POST requests on /pygmentize', function(done) {
    request(app.listen())
      .post('/pygmentize')
      .send({
        filename: "hello.rb",
        code: "puts \"Hello, world!\"",
        lexer: "ruby"
      })
      .expect(200)
      .end(function(err, content) {
        if(err) done(err);
        assert.ok(/span class/i.test(content.text));
        done();
      });
  });

  it('should 404 on other routes', function(done) {
    request(app.listen())
      .get('/pygmentize')
      .expect(404)
      .end(function(err) {
        if(err) done(err);
        done();
      });
  });
});
