// Retro landing page enhancements
(function () {
  // Typewriter rotating tagline
  const phrases = [
    'Retro Motion. Pixel Emotion.',
    'Vectors, GIFs & Glory.',
    'Serving 256 Colors Since 2001.',
    'Handcrafted Animation Relics.',
  ];
  const taglineEl = document.getElementById('tagline');
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let blinkOn = true;

  function tick() {
    if (!taglineEl) return;
    const current = phrases[phraseIndex];
    if (!deleting) {
      charIndex += 1;
      if (charIndex >= current.length) {
        deleting = true;
        setTimeout(tick, 1000);
        taglineEl.textContent = current + (blinkOn ? ' _' : '');
        blinkOn = !blinkOn;
        return;
      }
    } else {
      charIndex -= 1;
      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    taglineEl.textContent = current.slice(0, Math.max(0, charIndex)) + (blinkOn ? ' _' : '');
    blinkOn = !blinkOn;
    const delay = deleting ? 35 : 55;
    setTimeout(tick, delay);
  }
  setTimeout(tick, 400);

  // Visitor counter (persistent per-browser)
  const counterEl = document.getElementById('counter');
  try {
    const key = 'antique_visits';
    const prev = parseInt(localStorage.getItem(key) || '0', 10) || 0;
    const next = prev + 1;
    localStorage.setItem(key, String(next));
    if (counterEl) counterEl.textContent = String(next).padStart(6, '0');
  } catch (_) {
    if (counterEl) counterEl.textContent = '000001';
  }

  // Sparkle cursor
  const palette = ['#00ffff', '#ff00ff', '#ffd700', '#ffffff'];
  let lastSpawn = 0;
  document.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - lastSpawn < 16) return; // throttle
    lastSpawn = now;

    for (let i = 0; i < 2; i += 1) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      const color = palette[Math.floor(Math.random() * palette.length)];
      spark.style.color = color;
      const offsetX = (Math.random() - 0.5) * 10;
      const offsetY = (Math.random() - 0.5) * 10;
      spark.style.left = `${e.clientX + offsetX}px`;
      spark.style.top = `${e.clientY + offsetY}px`;
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 750);
    }
  });
})();
