import express from 'express';
const app = express();

app.get('/hello-world', function (req, res) {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('server listening on port localhost:3000')
});