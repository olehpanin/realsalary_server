"use strict";

let mongoose = require('mongoose');
let instance = null;
let ExchangeRatesSchema = require("./schemas/exchangeRatesSchema.js");
let ExchangeRates = mongoose.model('ExchangeRates', ExchangeRatesSchema);

class Db {
    constructor() {
        if (!instance) {
            instance = this;

            mongoose.connect('mongodb://localhost/realsalary');
            console.log("connect is here");
            let db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function () {
                console.info("we're connected!");
            });
        }

        return instance;
    }

    saveExchangeRates( obj ){
        let model = new ExchangeRates( obj );
        model.save(function (err, model) {
            if (err) return console.error(err);

            console.log( "model saved success!: " + model );
        });
    }

    getTodayRates(callback){
        let start = new Date();
        start.setHours(0,0,0,0);

        let end = new Date();
        end.setHours(23,59,59,999);

        ExchangeRates.find( {
            date: {
                $gte: start,
                $lt: end
            }
        }, function (err, rates) {
            if (err) return console.error(err);
            console.log("rates: ", rates.length);
            callback(rates);
        });
    }

    deleteAllExchangeRates( successCallback, errorCallback ){
        mongoose.connection.db.dropCollection('ExchangeRates', function(err, result) {
            console.log("err: ", err);
            console.log("result: ", result);
        });
    }
}

module.exports = Db;