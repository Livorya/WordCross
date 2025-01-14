// Button test area:
$('#test-get-word').on('click', getWord); // Button for getWord
$('#test-get-subject-words').on('click', getSubjectWords); // Button for getSubjectWords
$('#test-get-random-words').on('click', getRandomWords); // Button for getRandomWords

$('#subject-check').on('submit', getSubjectWords) // onsubmit for the testWord form




// Upper Scope variables:
let words = []; // Store 6 random words in this array
let revealedWords = []; // Store revealed words for checking/point-handling
let currentScore = 0; // Store currentScore

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


async function getRandomWords(e) {
    e.preventDefault();
    const subject = $('[name="subject"]').val();
    const response = await fetch('/random-words/' + subject);
    //.json converts C#-list into a JS-array
    words = await response.json(); // Store the fetched words in the global words array

    // Place each word [index] into #row1 -> #row6 as underscores based on word length
    // Create/repeat underscores based on the length of the word
    $('#row0').text('_'.repeat(words[0].length)); 
    $('#row1').text('_'.repeat(words[1].length));
    $('#row2').text('_'.repeat(words[2].length));
    $('#row3').text('_'.repeat(words[3].length));
    $('#row4').text('_'.repeat(words[4].length));
    $('#row5').text('_'.repeat(words[5].length));
}

// Event-listener for player1Input
$('#player1Input').on('keypress', function (e) {
    if (e.which === 13) { // #13 = Enter key
        const guessWord = $(this).val().trim(); // Get the input value, trim() whitespace
        if (guessWord) { // if there is an input..
            revealWord(guessWord); // Call revealWord with the guesseWord as in-parameter
            $(this).val(''); // Clear the input-field afterwards
        }
    }
});
// Function to reveal the word and update the score
function revealWord(guessWord) {
    // Convert the guessed word to uppercase for later comparision
    guessWord = guessWord.toUpperCase();

    // Assuming iterating through words array
    for (let i = 0; i < words.length; i++) {
        if (words[i].toUpperCase() === guessWord) { // .toUpperCase for same comparison
            $('#row' + i).text((words[i]).toUpperCase()); // Replace .text('_'.repeat(words[i].length)); with the actual word

            // Update current score
            currentScore = parseInt($('#player1Score').text()); // Get current score
            currentScore += 5; // Increment score by 5
            $('#player1Score').text(currentScore); // Update score display
            $('#player1Input').val(''); // Clear input field after submission
            revealedWords.Add(guessWord);
            //checkWin(); // Call function to check for win condition
            break; // Exit loop after finding the word
        }
    }
}



// FIXME: response is not handled correctly
async function getAllWord(e) {
    e.preventDefault(); // not reload page on form submit
    const response = await fetch('/api/allWords/'); // get (read)
    console.log(response);
    $('#message').text('Change?');
}


 // Round timer

let seconds = 0;
let minutes = 0;

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
    }

    // Format time values
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Display the time
    document.getElementById('timer').innerText = `${formattedMinutes}:${formattedSeconds}`;
}

// Start the timer when the page loads
window.onload = function () {
    setInterval(updateTimer, 1000);
};


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