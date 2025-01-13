// Button test area:
$('#test-get-word').on('click', getWord); // Button for getWord
$('#test-get-subject-words').on('click', getSubjectWords); // Button for getSubjectWords
$('#test-get-random-words').on('click', getRandomWords); // Button for getRandomWords

$('#subject-check').on('submit', getSubjectWords) // onsubmit for the testWord form


async function getWord(e) {
    e.preventDefault(); // not reload page on form submit
    const subject = $('[name="subject"]').val();
    const response = await fetch('/subject-check/' + subject); // get (read)
    
    const word = await response.text(); // Use .text() if your server returns plain text
    $('#message').text('Single Word from subject:\n ' + word);
}


// Reads all words from input subject and puts them into a list
async function getSubjectWords(e) {
    e.preventDefault(); // not reload page on form submit
    const subject = $('[name="subject"]').val();
    const response = await fetch('/subject-words/' + subject); // get (read)
    
    // Use .text() if your server returns plain text
    const words = await response.json(); //.json to convert C#list into JS array
    $('#message').text('All Subject Words:\n ' + words.join(', ')); //joins/concatenates the words array into the string
}

 //TODO: Refactor gerRandomWords .split('_')
// Returns 6 random words from input subject in a list, 
// then changes html.text() into .text(words[i])
async function getRandomWords(e) {
    e.preventDefault();
    const subject = $('[name="subject"]').val();
    const response = await fetch('/random-words/' + subject);
    //.json converts C#-list into a JS-array
    const words = await response.json(); 

    // Place each word [index] into #row1 -> #row6 .toUpperCase(!)
    $('#row0').text((words[0]).toUpperCase()); //.text()-content of #row = words[i].toUpperCase
    $('#row1').text((words[1]).toUpperCase());
    $('#row2').text((words[2]).toUpperCase());
    $('#row3').text((words[3]).toUpperCase());
    $('#row4').text((words[4]).toUpperCase());
    $('#row5').text((words[5]).toUpperCase());
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