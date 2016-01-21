var express = require("express");
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");
var url = "http://www.minfin.com.ua/currency";
var agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';
var $;



router.get("/", function(req,res,next){
    request({
        url : url,
        headers : {
            'User-Agent' : agent
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            $ = cheerio.load(body);

            var block = $(".shortInfoBlock"),
                dollarExchangeTable = block.eq(0),
                dollarBlackMarketSell = dollarExchangeTable.children().eq(2).children().eq(2).text(),
                interbankMarketBuy = dollarExchangeTable.children().eq(3).children().eq(1).text();

            var json = {
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
    return json = {
        blackMarket : {
            sell : parseFloat( dollarBlackMarketSell )
        },
        interbankMarket : {
            buy : parseFloat( interbankMarketBuy )
        }
    };
}

module.exports = router;