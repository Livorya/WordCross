

$('#subject-check').on('submit', getWord()) // onsubmit for the testWord form
// TODO: Refactor into getSubjectWords() fetching all words from input subject.
async function getWord(e) {
    e.preventDefault(); // not reload page on form submit
    const subject = $('[name="subject"]').val();
    const response = await fetch('/subject-check/' + subject); // get (read)
    
    const word = await response.text(); // Use .text() if your server returns plain text
    $('#message').text('Word: ' + word);
}

// FIXME: response is not handled correctly
async function getAllWord(e) {
    e.preventDefault(); // not reload page on form submit
    const response = await fetch('/api/allWords/'); // get (read)
    console.log(response);
    $('#message').text('Change?');
}

/*
* #Id index: *

Gameplay Screen:
subjectTitle - <h1> fetches current subject title from databate and displays it at the top of the gameboard

player1IncorrectWords - <ul> that contains player1 incorrect guesses
player1Score - <span> that contains player1 score
player1Input - <input> field for player1 guesses -> incorrect words will get added to (#player1IncorrectWords)

player2IncorrectWords - <ul> that contains player2 incorrect guesses
player2Score - <span> that contains player2 score
player2Input - <input> field for player2 guesses -> incorrect words will get added to (#player2IncorrectWords)

timer - <span> that displays time left


Setup Screen:
1playerBtn - Click for 1player mode
2playerBtn - Click for 2player mode

roundInput - input for #Rounds mode
pointGoalInput - input for #PointGoal mode
startBtn - button for starting the game

universeBtn - category-button for Universe
programmingBtn - category-button for Programming
musicBtn - category-button for Music
sportBtn - category-button for Sport
animalsBtn - category-button for Animals
moviesBtn - category-button for Movies

*/