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

console.log(game.chooseWord());


app.post('/checkGuess', (req, res) => {
    const twiml = new MessagingResponse();
    let userGuess = req.body.Body;
    if (chances > 0) {
        const result = game.isCorrect(userGuess);
        twiml.message(result);
        chances--;
        console.log(chances);
    }

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

/* app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    twiml.message('Wordle Chat Bot');
    
}); */

/* client.messages.create({
    body: 'Wordle Chat Bot',
    from: '+18594703539',
    to: '+16475738631'
}).then(message => console.log(message.sid)); */

http.createServer(app).listen(4000, () => { 
    console.log('Express server listening on port 4000');
});
