var mongo = require('mongodb');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('team', new Schema({
    name: String,
    matchname: String,
}),'team');
