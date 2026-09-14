// ========================================================
// MARINA RICE PORTFOLIO
// Interactive Environment
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector("#quarto-content");
  const hero = document.querySelector(".space-hero");

  if (!page) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ======================================================
  // ENVIRONMENT
  // ======================================================

  const environment = document.createElement("div");
  environment.className = "environment";

  const particleLayer = document.createElement("div");
  particleLayer.className = "parallax-layer layer-far";

  environment.appendChild(particleLayer);
  page.prepend(environment);

  // ======================================================
  // HERO SIGNAL RING
  // ======================================================

if (hero) {
  const heroSignal = document.createElement("div");
  heroSignal.className = "hero-signal-ring";
  hero.appendChild(heroSignal);
}
  // ======================================================
  // TRAJECTORY + COORDINATE DETAILS
  // ======================================================

  const trajectory = document.createElement("div");
  trajectory.className = "scientific-trajectory";
  trajectory.innerHTML = `
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="none" aria-hidden="true">
      <path
        class="trajectory-line"
        d="M -80 820
           C 250 730, 300 410, 610 470
           S 980 620, 1190 330
           S 1490 170, 1690 260"
      />
      <circle class="trajectory-node" cx="275" cy="650" r="2.7" />
      <circle class="trajectory-node" cx="610" cy="470" r="2.7" />
      <circle class="trajectory-node" cx="1040" cy="510" r="2.7" />
      <circle class="trajectory-node" cx="1370" cy="235" r="2.7" />
    </svg>
  `;
  document.body.appendChild(trajectory);
// ======================================================
  // MIXED AMBIENT PARTICLES
  // ======================================================

  const particles = [
    [8, 20, "dot"],
    [18, 72, "ring"],
    [27, 34, "dot"],
    [38, 15, "cross"],
    [48, 78, "dot"],
    [58, 27, "diamond"],
    [69, 63, "dot"],
    [78, 18, "ring"],
    [87, 74, "dot"],
    [94, 40, "cross"],
    [12, 48, "dot"],
    [73, 39, "dot"]
  ];

  particles.forEach(([x, y, type]) => {
    const particle = document.createElement("span");
    particle.className = "ambient-particle";

    if (type !== "dot") {
      particle.classList.add(`particle-${type}`);
    }

    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;

    particleLayer.appendChild(particle);
  });

  // ======================================================
  // CUSTOM CURSOR
  // ======================================================

  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (finePointer && !reducedMotion) {
    const cursorDot = document.createElement("div");
    cursorDot.className = "cursor-dot";

    const cursorRing = document.createElement("div");
    cursorRing.className = "cursor-ring";

    document.body.append(cursorRing, cursorDot);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    document.querySelectorAll(
      "a, button, .btn, .project-world, .project-tech code, .skills code"
    ).forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("is-hovering");
      });

      element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("is-hovering");
      });
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  // Static environment remains visible when reduced motion is enabled.
  if (reducedMotion) return;

  // ======================================================
  // MOUSE + SCROLL PARALLAX
  // ======================================================

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let targetScroll = 0;
  let currentScroll = 0;

  window.addEventListener("mousemove", (event) => {
    targetX = (event.clientX / window.innerWidth - 0.5) * 2;
    targetY = (event.clientY / window.innerHeight - 0.5) * 2;
  });

  function updateScrollProgress() {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    targetScroll =
      maxScroll > 0
        ? window.scrollY / maxScroll
        : 0;
  }

  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );

  window.addEventListener("resize", updateScrollProgress);

  updateScrollProgress();

  // ======================================================
  // GENOME WORLD INTERACTION
  // ======================================================

  const genomeWorld = document.querySelector(".genome-world");
  const genomeVisual = document.querySelector(".genome-visual");
  const genomeOuterOrbit = document.querySelector(".orbit-outer");
  const genomeInnerOrbit = document.querySelector(".orbit-inner");

  if (genomeWorld && genomeVisual) {
    genomeWorld.addEventListener("mousemove", (event) => {
      const rect = genomeWorld.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      genomeVisual.style.transform = `
        perspective(900px)
        rotateX(${y * -10}deg)
        rotateY(${x * 14}deg)
        translate3d(${x * 10}px, ${y * 8}px, 0)
        scale(1.04)
      `;

      if (genomeOuterOrbit) {
        genomeOuterOrbit.style.transform = `
          translate(-50%, -50%)
          rotate(${x * 12 - 18}deg)
          translate(${x * 8}px, ${y * 5}px)
        `;
      }

      if (genomeInnerOrbit) {
        genomeInnerOrbit.style.transform = `
          translate(-50%, -50%)
          rotate(${x * -16 + 42}deg)
          translate(${x * -6}px, ${y * -4}px)
        `;
      }
    });

    genomeWorld.addEventListener("mouseleave", () => {
      genomeVisual.style.transform = "";

      if (genomeOuterOrbit) {
        genomeOuterOrbit.style.transform = "";
      }

      if (genomeInnerOrbit) {
        genomeInnerOrbit.style.transform = "";
      }
    });
  }

  // ======================================================
  // SECTION SCROLL JOURNEY
  // ======================================================

  const sections =
    document.querySelectorAll(".portfolio-section");

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target;

          if (entry.isIntersecting) {
            section.classList.add("in-view");
            section.classList.remove("passed");
          } else {
            section.classList.remove("in-view");

            const rect =
              section.getBoundingClientRect();

            if (
              rect.bottom <
              window.innerHeight * 0.35
            ) {
              section.classList.add("passed");
            } else {
              section.classList.remove("passed");
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -20% 0px",
        threshold: 0.12
      }
    );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // ======================================================
  // ANIMATION LOOP
  // ======================================================

  function animate() {
    currentX +=
      (targetX - currentX) * 0.06;

    currentY +=
      (targetY - currentY) * 0.06;

    currentScroll +=
      (targetScroll - currentScroll) * 0.045;

    const particleDepth =
      currentScroll * -70;

    particleLayer.style.transform = `
      translate3d(
        ${currentX * -8}px,
        ${currentY * -8 + particleDepth}px,
        0
      )
    `;

    requestAnimationFrame(animate);
  }

  animate();
});
