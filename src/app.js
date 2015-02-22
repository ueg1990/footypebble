/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');
//var Vector2 = require('vector2');

// var main = new UI.Card({
//   title: 'Pebble.js',
//   icon: 'images/menu_icon.png',
//   subtitle: 'Hello World!',
//   body: 'Press any button.'
// });

// Show splash
var splashCard = new UI.Card({
  title: "Please Wait",
  body: "Downloading..."
});

var main = new UI.Menu({
  sections: [{
    title: 'Options',
    items: [{
      title: 'Update',
    }, {
      title: 'Scores'
    }]
  }]
});

main.show();

var score_board;
var time_frame_start;
var time_frame_stop;
//var LEAGUE_CODES = ['BL1', 'PL', 'SA', 'PD','FL1','CL', 'EC'];
var LEAGUE_CODES = ['BL1', 'PL', 'SA', 'PD', 'CL'];
var URL_fixtures = 'http://api.football-data.org/alpha/fixtures/';

main.on('select', function(e) {
  var card = new UI.Card();
  card.scrollable(true);
  if (e.item.title === 'Update') {
    splashCard.show();
    setTimeout(function() {
}, 5000);
    ajax(
  {
    url: URL_fixtures,
    type: 'json'
  },
  function(data) {
    // Success!aaqq22222
    score_board = data.fixtures;
    time_frame_start = data.timeFrameStart; 
    time_frame_stop = data.timeFrameEnd;
    //card.subtitle("Successfully fetched data!: " + data.timeFrameStart);
    //card.show();
    main.show();
    splashCard.hide();
  },
  function(error) {
    // Failure!
    card.subtitle('Failed fetching weather data: ' + error);
    card.show();
  }
);
  
  }
  else {
    card.title('Scorecard');
    //card.body(time_frame_start + ", " + time_frame_stop);
    var score_body = getCurrentDate() + '\n';
    var league_results = {};
    for (var fixture = 0; fixture < 20 ; fixture++) {
      //console.log("URL: " + score_board[fixture]._links.soccerseason.href);
      //var league = getLeague(score_board[fixture]._links.soccerseason.href);
      //console.log("League: " + league);
//       if (LEAGUE_CODES.indexOf(league[0]) >= 0) {
//         league_results[league[0]].push({'home_team' : score_board[fixture].homeTeamName , 
//                                         'away_team': score_board[fixture].awayTeamName,
//                                         'goals_home_team': score_board[fixture].result.goalsHomeTeam , 
//                                         'goals_away_team': score_board[fixture].result.goalsAwayTeam});
//       }
      //console.log("before score");
       score_body += score_board[fixture].homeTeamName +" ("+score_board[fixture].result.goalsHomeTeam+") - ("+
        score_board[fixture].result.goalsAwayTeam + ") "+ score_board[fixture].awayTeamName +"\n";
      score_body += "" + fixture;
      //console.log("after score");
    }
    //score_body += 'Team scores!!!'; //leage_results.length
    card.body(score_body);
    card.show();
  }
});

function getCurrentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  
  if(dd<10) {
      dd='0'+dd;
  } 
  
  if(mm<10) {
      mm='0'+mm;
  } 
  
  today = mm+'-'+dd+'-'+yyyy;
  return today;
}
function getLeague(fixture) {
  var result;
  ajax(
  {
    url: fixture,
    type: 'json'
  },
  function(data) {
    // Success!aaqq22222
    //console.log(data);
    result = [data.league, data.caption];
    //return get_result(result);
    //console.log(result);
    
  },
  function(error) {
    // Failure!
    console.log("Failure!!!");
    //return null;
    //card.subtitle('Failed fetching weather data: ' + error);
    //card.show();
  }
);
  //console.log(result);
   //return result;
}