// load page and run startGame()
window.addEventListener("load", (event) => {  startGame(); });

// Upper Scope variables:
let words = []; // Store 6 random words in this array
let hints = []; // Store hints correlated to content of words-array
let revealedWords = []; // Store revealed words for checking/point-handling
let currentScore = 0; // Store currentScore
let subjectId = 0; // Stores subjectId from .categoryBtn in setupscreen
let numberOfRounds = 0; // Stores #roundInput from setupscreen
let incorrectWords = []; // Stores incorrectWords li
let roundsLeft = 0; // Keeps track of rounds

 // Round timer
 let seconds = 0;
 let minutes = 0;

$('.categoryBtn').on('click', getSubjectId);
    
async function getSubjectId(e) {
    e.preventDefault();
    $('.categoryBtn').css('color', 'white');
    $(this).css('color', '#471980');
    subjectId =  $(this).attr('id');
}

$('#startGame').on('click', startButton);

async function startButton(e) {
    e.preventDefault();
    numberOfRounds = $('#roundInput').val();
    
    // Store it in localstorage 
    window.localStorage.setItem('keepId', subjectId);
    window.localStorage.setItem('keepRounds', numberOfRounds);

    window.location.href = 'gameplayscreen.html';
}

async function startGame(){
    subjectId = window.localStorage.getItem("keepId");
    numberOfRounds = window.localStorage.getItem("keepRounds");
    roundsLeft = numberOfRounds; // store chosen #rounds in roundsLeft
    
    await getRandomWordsWithHints();
}

// Gets 6 random words with corresponding hints and then splits/pushes them into two separate arrays.
// Displays _ _ _ _ & hints
async function getRandomWordsWithHints() {
    // subject_id is from the temporary testing input field that returns the subject_id 
    const subject_name = $('#' + subjectId).text();
    const subject_color = $('#' + subjectId).css('background-color');
    
    $('#subjectTitle').text(subject_name);
    $('#subjectTitle').css('background-color', subject_color);
    
    const response = await fetch('/random-words-with-hints/' + subjectId);
    
    const data = await response.json(); // parses C#-list into JS-array using .json and stores in variable "data"

    // Extract words and hints
    let newWords = [];
    let newHints = [];
    for (let i = 0; i < data.length; i++){
        newWords.push(data[i].split(";")[0]);
        newHints.push(data[i].split(";")[1]);
    }
    words = newWords;
    hints = newHints;
    
    // Loops out display with underscores and hints
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
    let foundWord = false; // gets toggled if words.[i] === guessWord

    for (let i = 0; i < words.length; i++) {
        if (words[i].toUpperCase() === (guessWord.toUpperCase())) { // if there is an input..
            revealWord(guessWord); // Call revealWord with the guesseWord as in-parameter
            $('#player1Input').val(''); // Clear the input-field afterwards
            foundWord = true; // toggle if found
            break; // break after finding word
        }
    }
    if (foundWord == false) { // only runs if for-loop doesn't match guessWord with words[i]
        incorrectGuess(guessWord); // calls incorrectGuess that appends <li>
        $('#player1Input').val(''); // Clear the input-field afterwards
    }
}

// Function to reveal the word and update the score
function revealWord(guessWord) {
    // Convert the guessed word to uppercase for later comparision
    guessWord = guessWord.toUpperCase();
    if (revealedWords.includes(guessWord)) {
        return;
    }

    // Assuming iterating through words array
    for (let i = 0; i < words.length; i++) {
        if (words[i].toUpperCase() === guessWord) { // .toUpperCase for same comparison
            $('#row' + i).text((words[i]).toUpperCase()); // Replace .text('_'.repeat(words[i].length)); with the actual word
            $('#row' + i).css('color', 'var(--player-blue-700)'); // Changes color to player-color
            // Check for already revealed words
            revealedWords.push(guessWord);

            // flash effect for correct guess
            const input = $('#player1Input');
            // .addClass and .removeClass toggles CSS
            input.addClass('flash-correct'); 
            setTimeout(function() { // setTumeout 500millisec delays class-toggle 
                input.removeClass('flash-correct');
            }, 500);

            updateScore(5);

            checkWin(); // Call function to check for win condition
            break; // Exit loop after finding the word
        }
    }
}

function incorrectGuess(guessWord) {
    guessWord = guessWord.toUpperCase();
    if (incorrectWords.includes(guessWord)) {
        return;
    } else {
        incorrectWords.push(guessWord);
    }
    
    $('#player1IncorrectWords').append(`<li/>${guessWord}`);
    
    // flash effect for incorrect guess
    const input = $('#player1Input');
    input.addClass('flash-incorrect');
    setTimeout(function() {
        input.removeClass('flash-incorrect');
    }, 500);
    
    updateScore(-1);
    return;
}

function updateScore(score) {
    // Update current score
    currentScore = parseInt($('#player1Score').text()); // Get current score
    currentScore += score;
    $('#player1Score').text(currentScore); // Update score display
    $('#player1Input').val(''); // Clear input field after submission
}

function checkWin() {
    if (revealedWords.length === words.length) {
        // Format the completion time
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        // Display completion time in modal
        $('#completion-time').text(`${formattedMinutes}:${formattedSeconds}`);
        
        // Update display for rounds left
        $('#rounds-left').text(roundsLeft - 1); // Show remaining rounds after current
        
        // Change button appearance if it's the last round
        if (roundsLeft <= 1) {
            $('#startRound')
                .text('End Game')
                .css('background-color', 'var(--incorrect-red-700)')
                .css('box-shadow', '0 4px 0 rgba(0, 0, 0, 0.4)');
        }
        
        // Show the modal
        $('#subject-modal').css('display', 'flex');
    }
}

$('#startRound').on('click', nextRound);
async function nextRound(e){
    e.preventDefault();
    
    roundsLeft--; // decrease rounds left every nextRound();
    if (roundsLeft <= 0) {
        // no rounds left, back to setup screen
        window.location.href = 'index.html';
        return;
    }
    
    $('#subject-modal').css('display', 'none');
    incorrectWords = []; // reset incorrectwords
    revealedWords = []; // reset revealedwords
    $('#player1IncorrectWords').empty();
    $('.row').css('color', 'ghostwhite'); //resets color of text in rows
    
    // Reset timer
    seconds = 0;
    minutes = 0;
    
    await getRandomWordsWithHints();
}

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
