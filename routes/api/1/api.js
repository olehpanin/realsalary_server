"use strict";

let express = require("express");
let router = express.Router();
let request = require("request");
let cheerio = require("cheerio");
let url = "http://www.minfin.com.ua/currency";
let agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';
let $;
let Db = require("../../../db/db.js");
let db = new Db();

new Db();
new Db();
new Db();

router.get("/", function(req,res,next){
    request({
        url : url,
        headers : {
            'User-Agent' : agent
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            $ = cheerio.load(body);

            let block = $(".shortInfoBlock"),
                dollarExchangeTable = block.eq(0),
                dollarBlackMarketSell = dollarExchangeTable.children().eq(2).children().eq(2).text(),
                interbankMarketBuy = dollarExchangeTable.children().eq(3).children().eq(1).text();

            let json = {
                blackMarket : {
                    sell : parseFloat( dollarBlackMarketSell )
                },
                interbankMarket : {
                    buy : parseFloat( interbankMarketBuy )
                }
            };



            res.json(json);
        }
    });
});

function getResponseObject( dollarBlackMarketSell, interbankMarketBuy ){
    let json = {
        blackMarket : {
            sell : parseFloat( dollarBlackMarketSell )
        },
        interbankMarket : {
            buy : parseFloat( interbankMarketBuy )
        }
    };

    return json;
}

module.exports = router;