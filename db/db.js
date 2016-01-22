"use strict";

let mongoose = require('mongoose');
let instance = null;

class Db {
    constructor() {
        if (!instance) {
            instance = this;

            mongoose.connect('mongodb://localhost/test');

            let db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function () {
                console.info("we're connected!");
            });

        }

        return instance;
    }

    getDb() {
        return mongoose;
    }
}

module.exports = Db;