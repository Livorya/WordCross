// Button test area:
$('#test-get-word').on('click', getWord); // Button for getWord
$('#test-get-subject-words').on('click', getSubjectWords); // Button for getSubjectWords
$('#test-get-random-words').on('click', getRandomWords); // Button for getRandomWords

$('#subject-check').on('submit', getSubjectWords) // onsubmit for the testWord form




// Upper Scope variables:
let words = []; // Store 6 random words in this array
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

/*
//TODO: Refactor gerRandomWords to change html.text() into .text(words[i])
// Returns 6 random words from input subject in a list
async function getRandomWords(e) {
    e.preventDefault();
    const subject = $('[name="subject"]').val();
    const response = await fetch('/random-words/' + subject);
    //.json converts C#-list into a JS-array
    const words = await response.json(); 

    // Place each word [index] into #row1 -> #row6 .toUpperCase()
    $('#row1').text((words[0]).toUpperCase()); //.text()-content of #row = words[i].toUpperCase
    $('#row2').text((words[1]).toUpperCase());
    $('#row3').text((words[2]).toUpperCase());
    $('#row4').text((words[3]).toUpperCase());
    $('#row5').text((words[4]).toUpperCase());
    $('#row6').text((words[5]).toUpperCase());
}
*/
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

// Event listener for player 1 input
$('#player1Input').on('keypress', function (e) {
    if (e.which === 13) { // Check if the Enter key is pressed
        const guessWord = $(this).val().trim(); // Get the input value, trim() whitespace
        if (guessWord) { // Ensure the input is not empty
            revealWord(guessWord); // Call revealWord with the guessed word
            $(this).val(''); // Clear the input field after submission
        }
    }
});

// Function to reveal the word and update the score
function revealWord(guessWord) {
    // Convert the guessed word to uppercase
    guessWord = guessWord.toUpperCase();

    // Assuming iterating through words array
    for (let i = 0; i < words.length; i++) {
        // Convert each word in the array to uppercase for comparison
        if (words[i].toUpperCase() === guessWord) {
            $('#row' + i).text((words[i]).toUpperCase()); // Replace underscore with the actual word

            // Update current score
            currentScore = parseInt($('#player1Score').text()); // Get current score
            currentScore += 5; // Increment score by 5
            $('#player1Score').text(currentScore); // Update score display
            $('#player1Input').val(''); // Clear input field after submission
            checkWin(); // Call function to check for win condition
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