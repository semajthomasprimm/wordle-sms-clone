# Wordle SMS Clone

Built with NodeJS and the Twilio API.


## How to use

### Initial setup
1. First install dependencies: npm install

2. Rename .env-dev to .env
3. [Sign up for Twilio and get a phone number](https://www.twilio.com/docs/sms/quickstart/node#sign-up-for-twilio-and-get-a-twilio-phone-number)
4. Add your Twilio credentials to .env file: TWILIO_ACCOUNT_SID= and TWILIO_AUTH_TOKEN=

### Setup server
1. Start your local server: npm run start

- ** To be able to use Twilio's API with your local server, you'll need a public url. I used [ngrok](https://ngrok.com/) while running my local server. 

2. Open another terminal and enter:
- ngrok http [port address]
- ** ngrok http 4000, by default

### Setup Twilio Webhook for Incoming Messages

1. Copy the forwarding https ngrok address
2. Navigate in Twillio console to Phone Numbers -> Manage -> Active numbers.
3. Paste the address into Message > A message comes in. Make sure to add /checkGuess to the ngrok url. Set endpoint to HTTP POST.

### Test app
1. Send a text message from your phone to your Twilio assigned number


### [Optional] Change port number
Change value of PORT in .env file