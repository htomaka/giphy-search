"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.get('/hello-world', function (req, res) {
  res.send('Hello World');
});
app.listen(3000, function () {
  console.log('server listening on port localhost:3000');
});