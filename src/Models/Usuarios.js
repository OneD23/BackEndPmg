'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = Schema({
    nombre: String,
    charterRate: String,
    build: String,
    length:String,
    guests:String,
    image:String
})

module.exports = mongoose.model('Usuario', UserSchema)