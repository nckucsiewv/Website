var mongo = require('mongodb');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('subscription', new Schema({
    User_id: String,
    Name: String
}),'subscription');
