"use strict";

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

let instance = null;

class Db{
    constructor(){
        if(!instance){
            instance = this;

            console.info("db created");
        }

        return instance;
    }
}

module.exports = Db;