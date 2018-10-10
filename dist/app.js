"use strict";

var _express = _interopRequireDefault(require("express"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _giphyApi = _interopRequireDefault(require("giphy-api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var giphyApi = (0, _giphyApi.default)();
var app = (0, _express.default)();
app.use(_express.default.static('public'));
app.engine('handlebars', (0, _expressHandlebars.default)({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.get('/', function (req, res) {
  var onResp = function onResp(err, response) {
    return res.render('home', {
      gifs: response.data
    });
  };

  var term = req.query.term;
  term ? giphyApi.search(term, onResp) : giphyApi.trending(onResp);
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