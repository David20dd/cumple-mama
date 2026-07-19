(() => {
  "use strict";
  const confettiColors = ["#f7dfb2", "#e6999d", "#ffffff", "#d5aa69", "#b94a6b"];
  const melody = [{frequency:392,at:0,length:.45},{frequency:440,at:.48,length:.45},{frequency:523.25,at:.96,length:.7},{frequency:440,at:1.72,length:.36},{frequency:493.88,at:2.12,length:.36},{frequency:659.25,at:2.54,length:.92},{frequency:587.33,at:3.56,length:.4},{frequency:523.25,at:4.04,length:.8}];
  const intro = document.querySelector("#gift-intro");
  const openGiftButton = document.querySelector("#open-gift");
  const musicButton = document.querySelector("#music-toggle");
  const musicLabel = musicButton.querySelector(".sound-label");
  const celebrateButton = document.querySelector("#celebrate-main");
  const confettiLayer = document.querySelector("#confetti-layer");
  const envelopeButton = document.querySelector("#envelope-button");
  const envelopeLabel = envelopeButton.querySelector(".envelope-label");
  const cake = document.querySelector("#cake");
  const blowCandlesButton = document.querySelector("#blow-candles");
  const celebrationButtonText = blowCandlesButton.querySelector(".celebration-button-text");
  const celebrationButtonIcon = blowCandlesButton.querySelector(".celebration-button-icon");
  const wishStatus = document.querySelector("#wish-status");
  const backTopButton = document.querySelector("#back-top");
  let confettiTimer = 0;
  let musicEngine = null;

  function buildConfetti() {
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 84; index += 1) {
      const particle = document.createElement("i");
      particle.style.setProperty("--x", `${((index * 43) % 116) - 58}vw`);
      particle.style.setProperty("--drift", `${((index * 29) % 44) - 22}vw`);
      particle.style.setProperty("--rotation", `${(index * 67) % 360}deg`);
      particle.style.setProperty("--delay", `${(index % 14) * .035}s`);
      particle.style.setProperty("--duration", `${1.9 + (index % 9) * .11}s`);
      particle.style.setProperty("--color", confettiColors[index % confettiColors.length]);
      if (index % 4 === 0) particle.classList.add("is-round");
      fragment.appendChild(particle);
    }
    confettiLayer.appendChild(fragment);
  }

  function celebrate() {
    window.clearTimeout(confettiTimer);
    confettiLayer.classList.remove("is-active");
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => confettiLayer.classList.add("is-active")));
    confettiTimer = window.setTimeout(() => confettiLayer.classList.remove("is-active"), 3600);
  }

  function playMelody(context, masterGain) {
    const start = context.currentTime + .06;
    melody.forEach((note) => {
      const oscillator = context.createOscillator();
      const noteGain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(note.frequency, start + note.at);
      noteGain.gain.setValueAtTime(.0001, start + note.at);
      noteGain.gain.exponentialRampToValueAtTime(.2, start + note.at + .04);
      noteGain.gain.exponentialRampToValueAtTime(.0001, start + note.at + note.length);
      oscillator.connect(noteGain); noteGain.connect(masterGain);
      oscillator.start(start + note.at); oscillator.stop(start + note.at + note.length + .08);
    });
  }

  function stopMusic() {
    if (!musicEngine) return;
    window.clearInterval(musicEngine.timer);
    musicEngine.gain.gain.setTargetAtTime(.0001, musicEngine.context.currentTime, .05);
    const contextToClose = musicEngine.context; musicEngine = null;
    window.setTimeout(() => contextToClose.close(), 180);
    musicButton.classList.remove("is-playing"); musicButton.setAttribute("aria-pressed", "false"); musicButton.setAttribute("aria-label", "Reproducir melodía"); musicLabel.textContent = "Música";
  }

  function toggleMusic() {
    if (musicEngine) { stopMusic(); return; }
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) { musicLabel.textContent = "No disponible"; return; }
    const context = new AudioContextClass(); const gain = context.createGain();
    gain.gain.value = .19; gain.connect(context.destination); playMelody(context, gain);
    const timer = window.setInterval(() => playMelody(context, gain), 6200);
    musicEngine = { context, gain, timer };
    musicButton.classList.add("is-playing"); musicButton.setAttribute("aria-pressed", "true"); musicButton.setAttribute("aria-label", "Pausar melodía"); musicLabel.textContent = "Sonando";
  }

  function setupRevealAnimations() {
    const elements = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) { elements.forEach((element) => element.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: .14 });
    elements.forEach((element) => observer.observe(element));
  }

  document.body.style.overflow = "hidden"; buildConfetti(); setupRevealAnimations();
  openGiftButton.addEventListener("click", () => { intro.classList.remove("is-open"); intro.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; celebrate(); window.setTimeout(() => document.querySelector("#inicio").focus(), 850); });
  musicButton.addEventListener("click", toggleMusic);
  celebrateButton.addEventListener("click", celebrate);
  envelopeButton.addEventListener("click", () => { const isOpen = envelopeButton.classList.toggle("is-open"); envelopeButton.setAttribute("aria-expanded", String(isOpen)); envelopeButton.setAttribute("aria-label", isOpen ? "Cerrar la carta" : "Abrir la carta"); envelopeLabel.textContent = isOpen ? "Toca para guardar la carta" : "Toca para abrir"; });
  blowCandlesButton.addEventListener("click", () => { cake.classList.add("is-blown"); celebrationButtonText.textContent = "¡Tu deseo va hacia las estrellas!"; celebrationButtonIcon.textContent = "✦"; wishStatus.textContent = "Que se cumpla todo lo bonito que acabas de imaginar."; celebrate(); });
  backTopButton.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); celebrate(); });
  window.addEventListener("pointermove", (event) => { document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`); document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`); }, { passive: true });
  window.addEventListener("pagehide", () => { window.clearTimeout(confettiTimer); if (musicEngine) { window.clearInterval(musicEngine.timer); musicEngine.context.close(); } });
})();
