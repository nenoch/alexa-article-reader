const Alexa = require('alexa-sdk');
const request = require('request-promise');
const cheerio = require("cheerio");


const APP_ID = '';

const SKILL_NAME = 'Medium.com Reader';
const startOutput = "Hi! Let's read a medium.com article. Say: read article";
const startReprompt = "Would you like to read an article on medium.com? Say: read article.";
const helpOutput = 'Hey, I might be able to help. You can say read article and I will read an article from medium.com for you.';
const helpReprompt = 'Remember, you can ask me to read an article';
const stopOutput = 'Goodbye!';

let url = 'https://medium.com/@the_economist/google-leads-in-the-race-to-dominate-artificial-intelligence-debc9fa86040';

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.response.speak(startOutput).listen(startReprompt);
        this.emit(":responseReady");
    },
    'ReadArticle': function () {
        request(url)
            .then(res => {
                let dom = cheerio.load(res);
                let title = dom('h1').first().text();
                let paragraphs = dom('div.section-content p').text();
                let speechOutput = `${title}<break time="1s"/>${paragraphs}`;
                this.emit(':tell', speechOutput);
            })
            .catch(err => {
                console.log(err)
                let speechOutput = "I am sorry, something went wrong.";
                this.emit(':tell', speechOutput);
            })
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', helpOutput, helpReprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', stopOutput);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', stopOutput);
    },
};