var express = require('express');
var router = express.Router();

var Matchs = require('./matchs');
var Teams = require('./teams');
var Promise = require('bluebird');
var Subscriptions = require('./subscription');

/* GET home page. */
router.get('/', function(req, res, next) {
  var matchs = Matchs.find({}).exec(); // match collection
  var teams = Teams.find({}).exec(); // team collection

  // join two collections to one scope
  return Promise.join(matchs, teams, (match, team) => {
	  //match.date = '2';
	  //match.save();
    
    var teamDict = {};
    team.forEach((t) => {
      teamDict[t.matchname] = t.name;
    })

    var dayOneMatch = {
      '8:00~9:00': {},
      '9:00~10:00': {},
      '10:00~11:00': {},
      '14:00~15:00': {},
      '15:00~16:00': {},
      '16:00~17:00': {},
    };
    var dayTwoMatch = {
      '8:00~9:00': {},
      '9:00~10:00': {},
      '10:00~11:00': {},
      '14:00~15:00': {},
      '15:00~16:00': {},
      '16:00~17:00': {},
    };
    
    match.forEach((m) => {
      if (m.date === '1') {
        dayOneMatch[m.time][m.court] = m;
      } else {
        dayTwoMatch[m.time][m.court] = m;
      }
    })

    var timeStamp = ['8:00~9:00', '9:00~10:00', '10:00~11:00', '14:00~15:00', '15:00~16:00', '16:00~17:00'];

	  res.render('index', {
      dayMatch: [dayOneMatch, dayTwoMatch],
      teamDict,
      timeStamp,
	  });
  });
});


router.post('/modify-score/:matchId', function(req, res, next) {
  Matchs.findById(req.params.matchId).exec()
    .then((match) => {
      match.score = req.body.score;
      return match.save();
    })
    .then(()=>{
      res.sendStatus(200);
    })
});

/*
router.post('/get-userId', function(req, res, next) {
  console.log(req.body.date);
  console.log(req.body.time);
  Matchs.find({'date':req.body.date, 'time': req.body.time}).exec()
    .then((matchs) => {
      //console.log(matchs);
      var teams = [];
      matchs.forEach((m)=>{
        teams.push(m.team1);
        teams.push(m.team2);
        teams.push(m.referee);
      })
      console.log(teams);
      return Subscriptions.find({'Name': {$in: teams}}).exec();
    })
    .then((user) => {
      console.log(user); // userId list
      res.redirect('/');
    })
});
*/

module.exports = router;
