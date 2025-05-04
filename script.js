const sosButton = document.getElementById('sosButton');
const lights = [
  document.getElementById('light1'),
  document.getElementById('light2'),
  document.getElementById('light3'),
  document.getElementById('light4'),
  document.getElementById('light5'),
];

const steadyLight = "assets/lamp-default.png";
const blinkingLight = "assets/lamp-blink.png";

let isBlinking = false;

sosButton.addEventListener('click', () => {
  if (isBlinking) return;

  isBlinking = true;
  let isBlinkOn = false;
  const intervalTime = 400;
  const maxDuration = 10000; // 7 seconds
  const startTime = Date.now();

  const interval = setInterval(() => {
    const now = Date.now();
    const elapsed = now - startTime;

    if (elapsed >= maxDuration) {
      clearInterval(interval);
      lights.forEach(light => light.src = steadyLight);
      isBlinking = false;
      return;
    }

    isBlinkOn = !isBlinkOn;
    lights.forEach(light => {
      light.src = isBlinkOn ? blinkingLight : steadyLight;
    });
  }, intervalTime);
});
