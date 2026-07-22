(() => {
  "use strict";

  window.__birthdayCardReady = true;

  const root = document.documentElement;
  const giftIntro = document.querySelector("#gift-intro");
  const openGiftButton = document.querySelector("#open-gift");
  const confettiLayer = document.querySelector("#confetti-layer");
  const celebrateButton = document.querySelector("#celebrate-main");
  const musicButton = document.querySelector("#music-toggle");
  const musicLabel = musicButton?.querySelector(".sound-label");
  const envelopeButton = document.querySelector("#envelope-button");
  const envelopeLabel = envelopeButton?.querySelector(".envelope-label");
  const cake = document.querySelector("#cake");
  const candlesButton = document.querySelector("#blow-candles");
  const candlesButtonText = candlesButton?.querySelector(".celebration-button-text");
  const candlesButtonIcon = candlesButton?.querySelector(".celebration-button-icon");
  const wishStatus = document.querySelector("#wish-status");
  const backTopButton = document.querySelector("#back-top");

  const confettiColors = ["#f7dfb2", "#e6999d", "#ffffff", "#d5aa69", "#b94a6b"];
  const isSmallScreen = window.matchMedia?.("(max-width: 560px)")?.matches ?? false;
  let confettiTimer = 0;
  let musicEngine = null;

  document.body.classList.toggle("intro-open", Boolean(giftIntro?.classList.contains("is-open")));

  function prepareConfetti() {
    if (!confettiLayer || confettiLayer.childElementCount) return;

    const fragment = document.createDocumentFragment();
    const particleCount = isSmallScreen ? 60 : 84;
    for (let index = 0; index < particleCount; index += 1) {
      const particle = document.createElement("i");
      if (index % 4 === 0) particle.className = "is-round";
      particle.style.setProperty("--x", `${((index * 43) % 116) - 58}vw`);
      particle.style.setProperty("--drift", `${((index * 29) % 44) - 22}vw`);
      particle.style.setProperty("--rotation", `${(index * 67) % 360}deg`);
      particle.style.setProperty("--delay", `${(index % 14) * 0.035}s`);
      particle.style.setProperty("--duration", `${1.9 + (index % 9) * 0.11}s`);
      particle.style.setProperty("--color", confettiColors[index % confettiColors.length]);
      fragment.appendChild(particle);
    }
    confettiLayer.appendChild(fragment);
  }

  function celebrate() {
    if (!confettiLayer) return;
    prepareConfetti();
    window.clearTimeout(confettiTimer);
    confettiLayer.classList.remove("is-active");
    void confettiLayer.offsetWidth;
    confettiLayer.classList.add("is-active");
    confettiTimer = window.setTimeout(() => confettiLayer.classList.remove("is-active"), 3600);
  }

  function openGift() {
    if (!giftIntro) return;
    giftIntro.classList.remove("is-open");
    giftIntro.setAttribute("aria-hidden", "true");
    document.body.classList.remove("intro-open");
    window.setTimeout(() => document.querySelector("#inicio")?.focus({ preventScroll: true }), 800);
  }

  openGiftButton?.addEventListener("click", openGift);
  celebrateButton?.addEventListener("click", celebrate);

  const hasFinePointer = window.matchMedia?.("(pointer: fine)")?.matches ?? true;
  if (hasFinePointer) {
    document.addEventListener("pointermove", (event) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    }, { passive: true });
  }

  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -4%" });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const melody = [
    [392, 0, 0.45], [440, 0.48, 0.45], [523.25, 0.96, 0.7],
    [440, 1.72, 0.36], [493.88, 2.12, 0.36], [659.25, 2.54, 0.92],
    [587.33, 3.56, 0.4], [523.25, 4.04, 0.8],
  ];

  function playMelody(context, masterGain) {
    const start = context.currentTime + 0.06;
    melody.forEach(([frequency, at, length]) => {
      const oscillator = context.createOscillator();
      const noteGain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, start + at);
      noteGain.gain.setValueAtTime(0.0001, start + at);
      noteGain.gain.exponentialRampToValueAtTime(0.2, start + at + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, start + at + length);
      oscillator.connect(noteGain);
      noteGain.connect(masterGain);
      oscillator.start(start + at);
      oscillator.stop(start + at + length + 0.08);
    });
  }

  function stopMusic() {
    if (!musicEngine) return;
    const engine = musicEngine;
    window.clearInterval(engine.timer);
    engine.gain.gain.setTargetAtTime(0.0001, engine.context.currentTime, 0.05);
    window.setTimeout(() => {
      if (engine.context.state !== "closed") void engine.context.close().catch(() => {});
    }, 180);
    musicEngine = null;
    musicButton?.classList.remove("is-playing");
    musicButton?.setAttribute("aria-pressed", "false");
    musicButton?.setAttribute("aria-label", "Reproducir melodía");
    if (musicLabel) musicLabel.textContent = "Música";
  }

  async function toggleMusic() {
    if (musicEngine) {
      stopMusic();
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      musicButton?.setAttribute("aria-label", "La melodía no está disponible en este navegador");
      return;
    }

    let context = null;
    try {
      context = new AudioContextClass();
      const gain = context.createGain();
      gain.gain.value = 0.14;
      gain.connect(context.destination);
      await context.resume();
      playMelody(context, gain);
      const timer = window.setInterval(() => playMelody(context, gain), 5200);
      musicEngine = { context, gain, timer };
      musicButton?.classList.add("is-playing");
      musicButton?.setAttribute("aria-pressed", "true");
      musicButton?.setAttribute("aria-label", "Pausar melodía");
      if (musicLabel) musicLabel.textContent = "Sonando";
    } catch (error) {
      console.warn("No fue posible iniciar la melodía en este dispositivo.", error);
      if (context && context.state !== "closed") {
        void context.close().catch(() => {});
      }
      musicButton?.classList.remove("is-playing");
      musicButton?.setAttribute("aria-pressed", "false");
      if (musicLabel) musicLabel.textContent = "Música";
    }
  }

  musicButton?.addEventListener("click", () => void toggleMusic());

  envelopeButton?.addEventListener("click", () => {
    const isOpen = envelopeButton.classList.toggle("is-open");
    envelopeButton.setAttribute("aria-expanded", String(isOpen));
    envelopeButton.setAttribute("aria-label", isOpen ? "Cerrar la carta" : "Abrir la carta");
    if (envelopeLabel) envelopeLabel.textContent = isOpen ? "Toca para guardar la carta" : "Toca para abrir";
  });

  candlesButton?.addEventListener("click", () => {
    cake?.classList.add("is-blown");
    if (candlesButtonText) candlesButtonText.textContent = "¡Tu deseo va hacia las estrellas!";
    if (candlesButtonIcon) candlesButtonIcon.textContent = "✦";
    if (wishStatus) wishStatus.textContent = "Que se cumpla todo lo bonito que acabas de imaginar.";
    celebrate();
  });

  backTopButton?.addEventListener("click", () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
    celebrate();
  });

  window.addEventListener("pagehide", stopMusic, { once: true });

  prepareConfetti();
})();
