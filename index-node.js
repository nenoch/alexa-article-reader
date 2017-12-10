const request = require("request-promise");
const cheerio = require("cheerio");
const jsonframe = require("jsonframe-cheerio");
let url = 'http://www.bbc.co.uk/news/uk-42300593';

request(url)
    .then(res => {
        let dom = cheerio.load(res);
        jsonframe(dom);
        let title = dom('h1').first().text();
        var allPElements = dom("p");
        let paragraphs = dom('div.story-body').find("p").text();
        
        console.log("title", title);
        console.log("p", paragraphs);

        // var frame = {
        //     "title": "h1",
        //     "paragraphs": {           // setting the parent item as "companies"
        //         "content": "p"   // defines the elements to search fo
        //     }
        // };
        
        // var output = dom('div.section-content').scrape(frame);
        // console.log(output);
    })
    .catch(err => console.log(err));