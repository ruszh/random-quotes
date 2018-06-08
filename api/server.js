const axios = require('axios');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const url = 'mongodb://localhost:27017/';
const PORT = 8000;

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/:lang', (req, res) => {
    const lang = req.params.lang || 'ru';
    axios.get(`http://api.forismatic.com/api/1.0/?format=json&method=getQuote&lang=${lang}`)
        .then(response => {
            if(response.status == 200) {
                res.send(response.data);
                res.end('End')
            }
            else res.end('Fail')
        });
})

app.get('/api/quotes', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        if(!req.body) return res.sendStatus(400);
        
        client.db('quotesdb').collection('quotes').find({}).toArray((err, quotes) => {
            if(err) return res.send('something go wrong')
            res.send(quotes);
            client.close();
        })
    })
})

app.post('/api/add', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const text = req.body.quote.quoteText;
    const author = req.body.quote.quoteAuthor;
    const quote = {
        quoteText: text,
        quoteAuthor: author
    };

    MongoClient.connect(url, (err, client) => {
        client.db('quotesdb').collection('quotes').insertOne(quote, (err, result) => {
            if(err) return res.status(400).send();
            console.log(quote)
            res.send(`${quote.quoteText} - added to db`);
            client.close();
        })
    })
})




app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log(`Server started on port ${PORT}`)
})    