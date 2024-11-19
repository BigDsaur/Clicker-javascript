let score = 0;
let clickValue = 1;
let idleValue = 0;       // Points per second from idle clicks
let clickUpgradeCost = 10;
let idleUpgradeCost = 50;
let autoClickUpgradeCost = 100;
let idleInterval = 1000;

// Toggler variables to switch between 2x and 1.5x multipliers
let clickMultiplierToggle = true;
let idleMultiplierToggle = true;
let autoClickMultiplierToggle = true;

// Get HTML elements
const scoreDisplay = document.getElementById("score");
const cookie = document.getElementById("cookie");
const clickUpgradeButton = document.getElementById("click-upgrade");
const idleUpgradeButton = document.getElementById("idle-upgrade");
const autoClickUpgradeButton = document.getElementById("auto-click-upgrade");
const totalCpsDisplay = document.getElementById("total-cps");
const floatingCookiesContainer = document.getElementById("floating-cookies");

// Function to update score display
function updateScore() {
  scoreDisplay.textContent = "Score: " + score;
  updateButtonStates();
}

function createFloatingCookie(x, y) {
  const floatingCookie = document.createElement("div");
  floatingCookie.classList.add("floating-cookie");
  floatingCookie.textContent = "🍪"; // Unicode emoji for cookie

  // Set initial position at the cursor location
  floatingCookie.style.top = `${y}px`;
  floatingCookie.style.left = `${x}px`;

  // Append to the document body
  document.body.appendChild(floatingCookie);

  // Remove floating cookie after animation completes
  setTimeout(() => {
    floatingCookie.remove();
  }, 1000); // Match the animation duration in CSS
}

// Function to enable/disable upgrade buttons based on score
function updateButtonStates() {
  clickUpgradeButton.disabled = score < clickUpgradeCost;
  idleUpgradeButton.disabled = score < idleUpgradeCost;
  autoClickUpgradeButton.disabled = score < autoClickUpgradeCost;
}

function updateStats() {
  const cps = idleValue * (1000 / idleInterval); // Calculate CPS from idle clicks
  totalCpsDisplay.textContent = cps.toFixed(2); // Update display
}


cookie.addEventListener("click", (event) => {
  // Increase score
  score += clickValue;
  updateScore();

  // Get cursor position and create floating cookie
  const { clientX, clientY } = event;
  createFloatingCookie(clientX, clientY); // Pass cursor coordinates
});

// Click Upgrade: Increases click power
clickUpgradeButton.addEventListener("click", () => {
  if (score >= clickUpgradeCost) {
    score -= clickUpgradeCost;
    clickValue += 1;  // Increase click power
    clickUpgradeCost *= clickMultiplierToggle ? 2 : 1.5;  // Alternate multiplier
    clickMultiplierToggle = !clickMultiplierToggle;  // Toggle multiplier
    clickUpgradeButton.textContent = "Click Power +1 (Cost: " + Math.ceil(clickUpgradeCost) + ")";
    updateScore();
    updateStats(); // Update stats to reflect new click power
  }
});

// Idle Upgrade: Adds idle clicks (passive income)
idleUpgradeButton.addEventListener("click", () => {
  if (score >= idleUpgradeCost) {
    score -= idleUpgradeCost;
    idleValue += 1;  // Increase idle points per second
    idleUpgradeCost *= idleMultiplierToggle ? 2 : 1.5;  // Alternate multiplier
    idleMultiplierToggle =! idleMultiplierToggle;  // Toggle multiplier
    idleUpgradeButton.textContent = "Idle Clicks +1 (Cost: " + Math.ceil(idleUpgradeCost) + ")";
    updateScore();
    updateStats();
  }
});

// Auto Click Upgrade: Decrease interval for idle clicks
autoClickUpgradeButton.addEventListener("click", () => {
  if (score >= autoClickUpgradeCost) {
    score -= autoClickUpgradeCost;
    idleInterval = Math.max(100, idleInterval * 0.9); // Reduce interval by 10%, minimum of 100ms
    autoClickUpgradeCost *= autoClickMultiplierToggle ? 2 : 1.5;  // Alternate multiplier
    autoClickMultiplierToggle = !autoClickMultiplierToggle;  // Toggle multiplier
    autoClickUpgradeButton.textContent = "Buy Faster Idle (Cost: " + Math.ceil(autoClickUpgradeCost) + ")";
    updateScore();
    updateStats();
    setupIdleClicks()
  }
});

// Idle click function
function setupIdleClicks() {
  clearInterval(idleClickInterval);
  idleClickInterval = setInterval(() => {
    score += idleValue;
    updateScore();
  }, idleInterval);
}

// Initial call to set up idle clicks
let idleClickInterval;
setupIdleClicks();

// Initial UI update
updateScore();
updateStats();