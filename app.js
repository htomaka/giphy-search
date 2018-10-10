import express from 'express';
import http from 'http';
import hbs from 'express-handlebars';

const app = express();

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    const {query} = req;
    const term = encodeURIComponent(query.term);
    const url = `http://api.giphy.com/v1/gifs/search?q=${term}&api_key=dc6zaTOxFJmzC`;

    http.get(url, response => {
        let body = '';

        response.on('data', data => {
            console.log('on data', data);
            body += data;
        });

        response.on('end', () => {
            const parsed = JSON.parse(body);
            res.render('home', {gifs: parsed.data});
        })
    });
});

app.get('/hello-gif', function (req, res) {
    const gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif';
    res.render('hello-gif', {gifUrl: gifUrl})
});

app.get('/greetings/:name', (req, res) => {
    const {name} = req.params;
    res.render('greetings', {name});
});

app.listen(3000, () => {
    console.log('server listening on port localhost:3000')
});