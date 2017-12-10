const request = require("request");
const cheerio = require("cheerio");
let url = 'https://medium.com/@the_economist/google-leads-in-the-race-to-dominate-artificial-intelligence-debc9fa86040';

request.get(url, (err, res, body) => {

    if (!err) {
        let dom = cheerio.load(body);
        let title = dom('h1').first().text();
        let paragraphs = dom('div.section-content p').text();  
        
        console.log("title", title);
        console.log("p", paragraphs);
    } else {
        console.log("Error occurred. - ", err)
    }
});