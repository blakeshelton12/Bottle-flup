// game.js
let score = 0;
let gameInterval;
let redirectionInterval;
let bottleColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
let currentColor = '#ff0000'; // Starting color for the game

// Select DOM elements
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-button');

// Set canvas size
canvas.width = 500;
canvas.height = 300;

// Start game when the button is clicked
function startGame() {
    score = 0;
    scoreElement.textContent = score;
    startButton.style.display = 'none';
    gameInterval = setInterval(updateGame, 1000 / 60); // 60 FPS
    redirectionInterval = setInterval(openAdLink, 15000); // Redirect every 15 seconds
    drawBottles();
}

// Draw bottles and the filling mechanism
function drawBottles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Bottle drawing
    ctx.fillStyle = "#555";
    ctx.fillRect(100, 100, 50, 150);  // Bottle 1
    ctx.fillRect(200, 100, 50, 150);  // Bottle 2
    ctx.fillRect(300, 100, 50, 150);  // Bottle 3

    // Add color filling
    ctx.fillStyle = currentColor;
    ctx.fillRect(100, 100 + (150 - 100), 50, 100);  // Fill Bottle 1
    ctx.fillRect(200, 100 + (150 - 100), 50, 100);  // Fill Bottle 2
    ctx.fillRect(300, 100 + (150 - 100), 50, 100);  // Fill Bottle 3
}

// Handle the clicking event
canvas.addEventListener('click', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    // Check if the click is within any of the bottles
    if (x >= 100 && x <= 150 && y >= 100 && y <= 250) {
        fillBottle(0);
    } else if (x >= 200 && x <= 250 && y >= 100 && y <= 250) {
        fillBottle(1);
    } else if (x >= 300 && x <= 350 && y >= 100 && y <= 250) {
        fillBottle(2);
    }
});

// Function to fill a bottle
function fillBottle(bottleIndex) {
    score += 10; // Increase score
    scoreElement.textContent = score;

    // Change the color randomly from the available colors
    currentColor = bottleColors[Math.floor(Math.random() * bottleColors.length)];

    // Re-draw bottles after filling
    drawBottles();
}

// Open an external link after 15 seconds
function openAdLink() {
    window.open('https://www.example.com', '_blank'); // Change the URL to the one you want
}

// Stop the game and clear intervals
function stopGame() {
    clearInterval(gameInterval);
    clearInterval(redirectionInterval);
    alert('Game Over! Final Score: ' + score);
    startButton.style.display = 'block'; // Show start button again
}
