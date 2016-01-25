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
let exchangeRatesSchema = require("../../../db/schemas/exchangeRatesSchema.js");

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
                dollarBlackMarketBuy = 0,
                interbankMarketSell = 0,
                interbankMarketBuy = dollarExchangeTable.children().eq(3).children().eq(1).text();


            let exchangeRatesObject = exchangeRatesSchema.getObjectToSave( dollarBlackMarketSell, dollarBlackMarketBuy,
                interbankMarketSell, interbankMarketBuy);

            db.saveExchangeRates( exchangeRatesObject );
            res.json(exchangeRatesObject);
        }
    });
});

router.get("/todayRates", function(req,res,next){
    db.getTodayRates(function(obj){
        res.json(obj);
    });
});

router.get("deleteAllExchangeRates", function(req,res,next){
    db.deleteAllExchangeRates(function( data ){
        console.log("success ", data);
    }, function( data ){
        console.error("error ", data);
    })
});

module.exports = router;