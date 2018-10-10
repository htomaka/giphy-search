"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.engine('handlebars', (0, _expressHandlebars.default)({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.get('/', function (req, res) {
  var query = req.query;
  var term = encodeURIComponent(query.term);
  var url = "http://api.giphy.com/v1/gifs/search?q=".concat(term, "&api_key=dc6zaTOxFJmzC");

  _http.default.get(url, function (response) {
    var body = '';
    response.on('data', function (data) {
      console.log('on data', data);
      body += data;
    });
    response.on('end', function () {
      var parsed = JSON.parse(body);
      res.render('home', {
        gifs: parsed.data
      });
    });
  });
});
app.get('/hello-gif', function (req, res) {
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif';
  res.render('hello-gif', {
    gifUrl: gifUrl
  });
});
app.get('/greetings/:name', function (req, res) {
  var name = req.params.name;
  res.render('greetings', {
    name: name
  });
});
app.listen(3000, function () {
  console.log('server listening on port localhost:3000');
});