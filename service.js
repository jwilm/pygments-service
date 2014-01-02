var koa = require('koa');
var logger = require('koa-logger');
var bodyParser = require('koa-body-parser');
var pygments = require('pygments-async');

/**
 * Generate a thunk for pygments.pygmentize
 *
 * The request object should contain
 *
 *     - `code`: Block of code to highlight
 *     - `lexer`: [optional] Lexer for pygmentize to use
 *     - `filename`: [optional] Filename to guess lexer from
 *
 * If `lexer` is provided, use that as the lexer. If `filename` is provided,
 * pygmentize will be called once with -N `filename` to return the lexer and
 * a second time with the lexer defined using the return value of the first
 * call. If neither is provided, pygmentize will guess which lexer to use based
 * on the provided code.
 *
 * @param {Object} request
 * @api private
 */

var pygmentize = function(request) {
  return function (done) {
    pygments.pygmentize(request.code, request, done);
  };
};

// Koa instance
var app = koa();

if(process.env.NODE_ENV !== "test")
  app.use(logger());

// Include body parser methods
bodyParser(app, {});

// Handle the request
app.use(function *() {
  if(this.path !== '/pygmentize' || this.method !== 'POST')
    return;

  var data = (yield * this.request.urlencoded()) ||
    (yield * this.request.json());

  if(!data)
    this.error(400, "must provide data in POST body");

  if(!data.code)
    this.error(400, "must provide `code` in POST body");

  this.body = yield pygmentize(data);
});

exports.app = app;
