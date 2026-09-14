// ========================================================
// MARINA RICE PORTFOLIO
// Interactive environment — Layer 1
// Mouse parallax + ambient particles
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
const page = document.querySelector("#quarto-content");
const hero = document.querySelector(".space-hero");

if (!page || !hero) return;
  if (!hero) return;

  // Respect accessibility preference
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Create environmental layers
  const environment = document.createElement("div");
  environment.className = "environment";

  const farLayer = document.createElement("div");
  farLayer.className = "parallax-layer layer-far";

  const midLayer = document.createElement("div");
  midLayer.className = "parallax-layer layer-mid";

  const nearLayer = document.createElement("div");
  nearLayer.className = "parallax-layer layer-near";

  environment.append(farLayer, midLayer, nearLayer);
  page.prepend(environment);

  // -----------------------------
  // FAR PARTICLES
  // -----------------------------

  const farParticles = [
    [8, 20], [18, 72], [27, 34], [38, 15],
    [48, 78], [58, 27], [69, 63], [78, 18],
    [87, 74], [94, 40], [12, 48], [73, 39]
  ];

  farParticles.forEach(([x, y]) => {
    const particle = document.createElement("span");
    particle.className = "ambient-particle";
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;

    farLayer.appendChild(particle);
  });

  // -----------------------------
  // MIDGROUND ORBS
  // -----------------------------

  const orbOne = document.createElement("div");
  orbOne.className = "bio-orb orb-one";

  const orbTwo = document.createElement("div");
  orbTwo.className = "bio-orb orb-two";

  midLayer.append(orbOne, orbTwo);

  // -----------------------------
  // FOREGROUND ORGANIC OBJECTS
  // -----------------------------

  const organismOne = document.createElement("div");
  organismOne.className = "organic-object organic-one";

  const organismTwo = document.createElement("div");
  organismTwo.className = "organic-object organic-two";

  nearLayer.append(organismOne, organismTwo);

  // Stop here for reduced-motion users
  if (reducedMotion) return;

  // -----------------------------
  // MOUSE PARALLAX
  // -----------------------------

  let targetX = 0;
  let targetY = 0;

  let currentX = 0;
  let currentY = 0;

  window.addEventListener("mousemove", (event) => {
  targetX = (event.clientX / window.innerWidth - 0.5) * 2;
  targetY = (event.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    // Smooth movement instead of snapping to cursor
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    farLayer.style.transform =
      `translate3d(${currentX * -8}px, ${currentY * -8}px, 0)`;

    midLayer.style.transform =
      `translate3d(${currentX * -18}px, ${currentY * -18}px, 0)`;

    nearLayer.style.transform =
      `translate3d(${currentX * -35}px, ${currentY * -35}px, 0)`;

    requestAnimationFrame(animate);
  }

  animate();
});