var gameCommencing = 0;
var startLevel = 0;
var gamePattern = [];
var userPattern = [];

$(document).keypress(function () {
  if (gameCommencing === 0) {
    gameCommencing = 1;
    nextSequence();
  }
});

$('.btn').click(function () {
  if (gameCommencing === 0) return;
  var clickedTile = $(this).attr('id');
  userPattern.push(clickedTile);
  $('#' + clickedTile)
    .fadeOut(75)
    .fadeIn(75);
  new Audio('sounds/' + clickedTile + '.mp3').play();
  var currentIndex = userPattern.length - 1;
  if (userPattern[currentIndex] === gamePattern[currentIndex]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 800);
    }
  } else {
    new Audio('sounds/wrong.mp3').play();
    $('h1').text('Game Over, Press Any Key to Restart');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    startOver();
  }
});

function nextSequence() {
  userPattern = [];
  startLevel++;
  $('h1').text('Level ' + startLevel);
  var randomNumber = Math.floor(Math.random() * 4) + 1;
  var tile = '';
  if (randomNumber === 1) tile = 'green';
  else if (randomNumber === 2) tile = 'red';
  else if (randomNumber === 3) tile = 'yellow';
  else tile = 'blue';
  gamePattern.push(tile);
  for (let i = 0; i < gamePattern.length; i++) {
    (function (index) {
      setTimeout(function () {
        var t = gamePattern[index];
        $('#' + t)
          .fadeOut(75)
          .fadeIn(75);
        new Audio('sounds/' + t + '.mp3').play();
      }, index * 600);
    })(i);
  }
}

function startOver() {
  gameCommencing = 0;
  startLevel = 0;
  gamePattern = [];
  userPattern = [];
}
