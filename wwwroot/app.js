/* Testing selector:
    $subjectTitle.on('click', function(e) {
        e.preventDefault();
        $(this).css('background-color', 'black');
    });
*/

/*
* #Id index: *

Gameplay Screen:
#subjectTitle - <h1> fetches current subject title from databate and displays it at the top of the gameboard

#player1IncorrectWords - <ul> that contains player1 incorrect guesses
#player1Score - <span> that contains player1 score
#player1Input - <input> field for player1 guesses -> incorrect words will get added to (#player1IncorrectWords)

#player2IncorrectWords - <ul> that contains player2 incorrect guesses
#player2Score - <span> that contains player2 score
#player2Input - <input> field for player2 guesses -> incorrect words will get added to (#player2IncorrectWords)

#timer - <span> that displays time left


Setup Screen:
#1playerBtn - Click for 1player mode
#2playerBtn - Click for 2player mode

#roundInput - input for #Rounds mode
#pointGoalInput - input for #PointGoal mode
#startBtn - button for starting the game

#universeBtn - category-button for Universe
#programmingBtn - category-button for Programming
#musicBtn - category-button for Music
#sportBtn - category-button for Sport
#animalsBtn - category-button for Animals
#moviesBtn - category-button for Movies
*/

/* Gameplay Screen Selectors */
const $subjectTitle = $('#subjectTitle');
const $player1IncorrectWords = $('#player1IncorrectWords');
const $player1Score = $('#player1Score');
const $player1Input = $('#player1Input');

const $player2IncorrectWords = $('#player2IncorrectWords');
const $player2Score = $('#player2Score');
const $player2Input = $('#player2Input');

const $timer = $('#timer');

/* Setup Screen Selectors */
const $1PlayerBtn = $('#1playerBtn');
const $2PlayerBtn = $('#2playerBtn');
const $roundInput = $('#roundInput');
const $pointGoalInput = $('#pointGoalInput');
const $startBtn = $('#startBtn');

/* Category Button Selectors */
const $universeBtn = $('#universeBtn');
const $programmingBtn = $('#programmingBtn');
const $musicBtn = $('#musicBtn');
const $sportBtn = $('#sportBtn');
const $animalsBtn = $('#animalsBtn');
const $moviesBtn = $('#moviesBtn');


