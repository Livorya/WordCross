// Accessing spans
const player1AvgRound = document.getElementById('player1-avg-round').textContent;
const player2TotalScore = document.getElementById('player2-total-score').textContent;
const winner = document.getElementById('winner').textContent;

// Updating a span's content dynamically
document.getElementById('player1-avg-round').textContent = '10';

// Adding a click event to the button
const newGameButton = document.getElementById('new-game-btn');
newGameButton.addEventListener('click', () => {
    alert('New game setup initiated!');
});
