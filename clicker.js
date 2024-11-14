// script.js

// hihhuli
let testscore = 0;
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

// Counters to track upgrades bought
let clickUpgradeCount = 0;
let idleUpgradeCount = 0;
let autoClickUpgradeCount = 0;

// Get HTML elements
const scoreDisplay = document.getElementById("score");
const cookie = document.getElementById("cookie");
const clickUpgradeButton = document.getElementById("click-upgrade");
const idleUpgradeButton = document.getElementById("idle-upgrade");
const autoClickUpgradeButton = document.getElementById("auto-click-upgrade");
const clickUpgradeCountDisplay = document.getElementById("click-power");
const idleUpgradeCountDisplay = document.getElementById("idle-upgrade-count");
const autoClickUpgradeCountDisplay = document.getElementById("auto-click-upgrade-count");
const totalCpsDisplay = document.getElementById("total-cps");
const manualClickPowerDisplay = document.getElementById("manual-click-power");

// Function to update score display
function updateScore() {
  scoreDisplay.textContent = "Score: " + score;
  updateButtonStates();
}

// Function to enable/disable upgrade buttons based on score
function updateButtonStates() {
  clickUpgradeButton.disabled = score < clickUpgradeCost;
  idleUpgradeButton.disabled = score < idleUpgradeCost;
  autoClickUpgradeButton.disabled = score < autoClickUpgradeCost;
}

// Function to update the stats display (counts, CPS, and manual click power)
function updateStats() {
  clickUpgradeCountDisplay.textContent = clickUpgradeCount;
  idleUpgradeCountDisplay.textContent = idleUpgradeCount;
  autoClickUpgradeCountDisplay.textContent = autoClickUpgradeCount;
  totalCpsDisplay.textContent = (idleValue * (1000 / idleInterval)).toFixed(2); // CPS calculation
  manualClickPowerDisplay.textContent = clickValue; // Display the current manual click power
}

// Function to handle cookie click
cookie.addEventListener("click", () => {
  score += clickValue;
  updateScore();
});

// Click Upgrade: Increases click power
clickUpgradeButton.addEventListener("click", () => {
  if (score >= clickUpgradeCost) {
    score -= clickUpgradeCost;
    clickValue += 1;  // Increase click power
    clickUpgradeCost *= clickMultiplierToggle ? 2 : 1.5;  // Alternate multiplier
    clickMultiplierToggle = !clickMultiplierToggle;  // Toggle multiplier
    clickUpgradeCount++;  // Increase count of this upgrade
    clickUpgradeButton.textContent = "Increase Click Power (Cost: " + Math.ceil(clickUpgradeCost) + ")";
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
    idleMultiplierToggle = !idleMultiplierToggle;  // Toggle multiplier
    idleUpgradeCount++;  // Increase count of this upgrade
    idleUpgradeButton.textContent = "Buy Idle Clicks (Cost: " + Math.ceil(idleUpgradeCost) + ")";
    updateScore();
    updateStats();
  }
});

// Auto Click Upgrade: Decrease interval for idle clicks
autoClickUpgradeButton.addEventListener("click", () => {
  if (score >= autoClickUpgradeCost) {
    score -= autoClickUpgradeCost;
    idleInterval *= 0.8;  // Reduce the interval for faster idle clicks
    autoClickUpgradeCost *= autoClickMultiplierToggle ? 2 : 1.5;  // Alternate multiplier
    autoClickMultiplierToggle = !autoClickMultiplierToggle;  // Toggle multiplier
    autoClickUpgradeCount++;  // Increase count of this upgrade
    autoClickUpgradeButton.textContent = "Buy Faster Idle (Cost: " + Math.ceil(autoClickUpgradeCost) + ")";
    clearInterval(idleClickInterval);
    idleClickInterval = setInterval(() => {
      score += idleValue;
      updateScore();
    }, idleInterval);
    updateScore();
    updateStats();
  }
});

// Set up the idle click interval
let idleClickInterval = setInterval(() => {
  score += idleValue;
  updateScore();
}, idleInterval);

// Initial score and stats display
updateScore();
updateStats();
click-upgrade-count