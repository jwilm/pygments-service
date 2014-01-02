pygments-service
================

Node service using Koa for Pygments

## Usage
The app can be run standalone or mounted into a larger koa app. To run the
service by itself, `npm start` will get you going. To mount into your own app,
require this package and pass `app.callback()` into your `http.createServer`
call.

### Routes
The only route supported by this service is `POST` on `/pygmentize`. The only
required parameter is `code` which is passed along to the pygmentize exe.
Supplying a `lexer` may yield better results.

## License
MIT
