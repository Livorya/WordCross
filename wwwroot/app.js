// Button test area:
$('#test-get-word').on('click', getWord); // Button for getWord
$('#test-get-subject-words').on('click', getSubjectWords); // Button for getSubjectWords
$('#test-get-random-words-with-hints').on('click', getRandomWordsWithHints);

$('#subject-check').on('submit', getSubjectWords) // onsubmit for the testWord form




// Upper Scope variables:
let words = []; // Store 6 random words in this array
let hints = [];
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




async function getRandomWordsWithHints(e) {
    e.preventDefault();
    const subject = $('[name="subject"]').val();
    const response = await fetch('/random-words-with-hints/' + subject);

    if (!response.ok) {
        console.error("Failed to fetch words with hints:", response.statusText);
        return;
    }

    
    const data = await response.json(); // Ensure this matches backend structure

    // Extract words and hints
    let newWords = [];
    let newHints = [];
    for (let i = 0; i < data.length; i++){
        newWords.push(data[i].split(";")[0]);
        newHints.push(data[i].split(";")[1]);
    }
    words = newWords;
    hints = newHints;
    

    // Display underscores and hints
    for (let i = 0; i < words.length; i++) {
        $(`#row${i}`).text('_'.repeat(words[i].length)); // Display underscores
        $(`#hint${i}`).text(hints[i]); // Display the corresponding hint
    }
}





// Event-listener for player1Input
$('#player1Input').on('keypress', function (e) {
    if (e.which === 13) { // #13 = Enter key
        const guessWord = $(this).val().trim(); // Get the input value, trim() whitespace
        checkWord(guessWord);
    }
});
function checkWord(guessWord) {
    for (let i = 0; i < words.length; i++) {
        if (words[i].toUpperCase() === (guessWord.toUpperCase())) { // if there is an input..
            revealWord(guessWord); // Call revealWord with the guesseWord as in-parameter
            $('#player1Input').val(''); // Clear the input-field afterwards
        } else {
            //incorrectGuess(guessWord);
            $('#player1Input').val(''); // Clear the input-field afterwards
        }
    }
}

// Function to reveal the word and update the score
function revealWord(guessWord) {
    // Convert the guessed word to uppercase for later comparision
    guessWord = guessWord.toUpperCase();
    if(revealedWords.includes(guessWord)) {
        return;
    }

    // Assuming iterating through words array
    for (let i = 0; i < words.length; i++) {
        if (words[i].toUpperCase() === guessWord) { // .toUpperCase for same comparison
            $('#row' + i).text((words[i]).toUpperCase()); // Replace .text('_'.repeat(words[i].length)); with the actual word

            // Check for already revealed words
            revealedWords.push(guessWord);

            // Update current score
            currentScore = parseInt($('#player1Score').text()); // Get current score
            currentScore += 5; // Increment score by 5
            $('#player1Score').text(currentScore); // Update score display
            $('#player1Input').val(''); // Clear input field after submission
            
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