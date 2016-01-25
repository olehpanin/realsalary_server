"use strict";
let mongoose = require('mongoose');

let ExchangeRatesSchema = mongoose.Schema({
    createdOn: {
        type: Date,
        default: Date.now
    },
    blackMarket : {
        sell : Number,
        buy : Number
    },
    interbankMarket : {
        sell : Number,
        buy : Number
    }
});

ExchangeRatesSchema.methods.getAll = function(){

};

ExchangeRatesSchema.methods.clearAll = function(){

};

ExchangeRatesSchema.getObjectToSave = function( dollarBlackMarketSell,
                                                dollarBlackMarketBuy,
                                                interbankMarketSell,
                                                interbankMarketBuy ){
    let json = {
        blackMarket : {
            sell : parseFloat( dollarBlackMarketSell ),
            buy : parseFloat( dollarBlackMarketBuy )
        },
        interbankMarket : {
            sell : parseFloat( interbankMarketSell ),
            buy : parseFloat( interbankMarketBuy )
        }
    };

    return json;
};


module.exports = ExchangeRatesSchema;