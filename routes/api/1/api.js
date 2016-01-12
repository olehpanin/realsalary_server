var express = require("express");
var router = express.Router();
//var request = require("request");
//var cheerio = require("cheerio");
//var Curl = require( 'node-libcurl' ).Curl;
//var agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';
//var $;

router.get("/", function(req,res,next){

    res.json( getResponseObject( 25.75, 23.4 ) );

    //var curl = new Curl();
    //
    //curl.setOpt( 'URL', 'www.minfin.com.ua/currency' );
    //curl.setOpt( 'FOLLOWLOCATION', true );
    //curl.setOpt( 'USERAGENT', agent);
    //
    //curl.on( 'end', function( statusCode, body, headers ) {
    //
    //    console.info( statusCode );
    //    console.info( '---' );
    //    console.info( body.length );
    //
    //    $ = cheerio.load(body);
    //
    //    var block = $(".shortInfoBlock"),
    //        dollarExchangeTable = block.eq(0),
    //        dollarBlackMarketSell = dollarExchangeTable.children().eq(2).children().eq(2).text(),
    //        interbankMarketBuy = dollarExchangeTable.children().eq(3).children().eq(1).text();
    //
    //    var json = {
    //        blackMarket : {
    //            sell : parseFloat( dollarBlackMarketSell )
    //        },
    //        interbankMarket : {
    //            buy : parseFloat( interbankMarketBuy )
    //        }
    //    };
    //
    //    res.json(json);
    //
    //    console.info( '---' );
    //    console.info( this.getInfo( 'TOTAL_TIME' ) );
    //
    //    this.close();
    //});
    //
    //curl.on( 'error', curl.close.bind( curl ) );
    //
    //curl.perform();
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