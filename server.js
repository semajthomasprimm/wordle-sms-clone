require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio/lib/twiml/MessagingResponse');
const game = require('./game');
    
const app = express();
var chances = game.numOfGuesses;
console.log(chances);
//console.log(game.isCorrect('hoard'));
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/checkGuess', (req, res) => {
    const twiml = new MessagingResponse();
    let userGuess = req.body.Body;

    let isValidInput = game.isInputValid(req.body.Body); // determines if user input is valid

    if (chances > 0 && isValidInput) {
        const result = game.isCorrect(userGuess);
        twiml.message(result);
        chances--;
        console.log(chances);
    } else{
        twiml.message('invalid');
    }

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

http.createServer(app).listen(process.env.PORT, () => { 
    console.log('Express server listening on port 4000');
});

console.log(game.chooseWord());