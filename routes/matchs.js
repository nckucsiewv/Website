var mongo = require('mongodb');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('match', new Schema({
    number: String,
    team1: String,
    team2: String,
    referee: String,
    time: String,
    date: String,
    court: String,
    score: String,
    winner: String
}),'match');
