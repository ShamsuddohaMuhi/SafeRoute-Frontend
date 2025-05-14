const lights = document.querySelectorAll('.light-image');
const sosButtons = document.querySelectorAll('.sos-button');
const indicators = document.querySelectorAll('.indicator');
const emergencyText = document.getElementById('emergency-text');
const resetButton = document.getElementById('reset-button');
const whatToDoPanel = document.getElementById('what-to-do'); // Reference the panel

const OFFWHITE_IMG = "assets/offwhite.png";
const RED_IMG = "assets/red.png";

let isBlinking = false;
let blinkInterval;
let blinkCount = 0;
let activeIndex = -1;

function resetAll() {
  clearInterval(blinkInterval);
  isBlinking = false;
  blinkCount = 0;
  activeIndex = -1;

  // Reset lights and indicators
  lights.forEach(light => light.src = OFFWHITE_IMG);
  indicators.forEach(indicator => {
    indicator.classList.remove('blinking');
    indicator.style.backgroundColor = 'white';
  });
  emergencyText.textContent = "Emergency! Someone help beside Light --";
  // Remove active class from all SOS buttons
  sosButtons.forEach(button => button.classList.remove('active'));
  // Hide the What to Do panel on reset
  whatToDoPanel.classList.remove('visible');
}

sosButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (isBlinking) return;
    activeIndex = parseInt(button.getAttribute('data-light'));
    isBlinking = true;
    blinkCount = 0;

    // Show the What to Do panel
    whatToDoPanel.classList.add('visible');

    // Keep emergency text until reset
    emergencyText.textContent = `Emergency! Someone needs help beside Light 0${activeIndex + 1}`;

    // Add active class to the clicked button
    button.classList.add('active');

    blinkInterval = setInterval(() => {
      blinkCount++;

      lights.forEach((light, index) => {
        if (index === activeIndex) {
          light.src = OFFWHITE_IMG; // Active stays offwhite
        } else {
          light.src = light.src.includes("offwhite") ? RED_IMG : OFFWHITE_IMG;
        }
      });

      indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
          indicator.classList.add('blinking');
        }
      });

      // After 8 seconds (16 half-second intervals), stop blinking
      if (blinkCount >= 16) {
        clearInterval(blinkInterval);
        isBlinking = false;

        // Stop animation but keep red indicator
        indicators[activeIndex].classList.remove('blinking');
        indicators[activeIndex].style.backgroundColor = 'red';

        // Remove active class after 8 seconds
        setTimeout(() => {
          button.classList.remove('active');
        }, 8000); // 8000ms = 8 seconds
      }
    }, 500);
  });
});

resetButton.addEventListener('click', resetAll);