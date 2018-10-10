import express from 'express';
import hbs from 'express-handlebars';
import giphy from 'giphy-api';

const giphyApi = giphy();
const app = express();

app.use(express.static('public'));

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    const onResp = (err, response) => res.render('home', {gifs: response.data});
    const {term} = req.query;
    term ? giphyApi.search(term, onResp) : giphyApi.trending(onResp);
});

app.get('/hello-gif', function (req, res) {
    const gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif';
    res.render('hello-gif', {gifUrl})
});

app.get('/greetings/:name', (req, res) => {
    const {name} = req.params;
    res.render('greetings', {name});
});

app.listen(3000, () => {
    console.log('server listening on port localhost:3000')
});