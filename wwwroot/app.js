
//$('body').on('click', changeColor);

function changeColor(e){
    e.preventDefault();
    let background = $(this).css('background-color', 'black');
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


*/