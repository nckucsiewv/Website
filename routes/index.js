var express = require('express');
var router = express.Router();

var Match = require('./student');
var Promise = require('bluebird');



/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  Match.find({}).exec()
   .then((match) => {
	   
	   console.log(match);
	   console.log('123');
	   
	   //match.date = '2';
	   //match.save();
	   
	   res.render('index',{
		match,
	   });
   })
   .catch(()=>{
	   
   })
});

module.exports = router;
