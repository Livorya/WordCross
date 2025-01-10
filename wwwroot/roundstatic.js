// Access Player 1 stats
const player1AvgRound = document.getElementById('player1-avg-round').textContent;
const player1TotalScore = document.getElementById('player1-total-score').textContent;

// Access Player 2 stats
const player2AvgRound = document.getElementById('player2-avg-round').textContent;
const player2TotalScore = document.getElementById('player2-total-score').textContent;

// Access Summary Stats
const avgRoundTime = document.getElementById('avg-round-time').textContent;
const roundsLeft = document.getElementById('rounds-left').textContent;

// Update a stat dynamically
document.getElementById('points-goal').textContent = '50';

// Add event listener to the button
const continueButton = document.getElementById('continue-btn');
continueButton.addEventListener('click', () => {
    alert('Continuing to the next round!');
});
