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

main.on('select', function(e) {
  var card = new UI.Card();
  card.scrollable(true);
  if (e.item.title === 'Update') {
    splashCard.show();
    setTimeout(function() {
  }, 5000);
    var URL = 'http://api.football-data.org/alpha/fixtures/';
    ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
    score_board = data;
    card.subtitle("Successfully fetched data!: " + data.length);
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
    card.title('A Card');
    card.subtitle('Is a Window');
    card.body('Selected item #' + e.item.title + ' of section #' + e.section.title + " : " + score_board);
    card.show();
  }
});
