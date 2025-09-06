// Background slideshow
let slides = document.querySelectorAll(".slide");
let current = 0;
setInterval(() => {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}, 5000); // change every 5s

// Particle effect (simple fireflies)
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numParticles = 60; // more particles

// Create particles
for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 2,
    speedY: (Math.random() - 0.5) * 2
  });
}

// Draw particles (yellow glowing dots)
function drawParticles() {
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 215, 0, 0.8)"; // golden glow
    ctx.fill();
  });
}

// Draw connecting lines
function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) { // threshold for line
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 215, 0, 0.2)";
        ctx.lineWidth = 1;
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

// Update particle positions
function updateParticles() {
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;

    // Bounce off edges
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  });
}

// Animate everything
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawParticles();
  connectParticles();
  updateParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Handle resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const steamCanvas = document.getElementById("steamWaves");
const sctx = steamCanvas.getContext("2d");
steamCanvas.width = window.innerWidth;
steamCanvas.height = 200;

let t = 0;
function drawSteam() {
  t += 0.02;
  sctx.clearRect(0, 0, steamCanvas.width, steamCanvas.height);

  for (let i = 0; i < 3; i++) {
    sctx.beginPath();
    sctx.moveTo(0, 200);

    for (let x = 0; x < steamCanvas.width; x++) {
      let y = 200 - 50 * Math.sin((x * 0.01) + (t + i));
      sctx.lineTo(x, y);
    }

    sctx.strokeStyle = "rgba(255,255,255,0.3)";
    sctx.lineWidth = 2;
    sctx.stroke();
  }
}
setInterval(drawSteam, 30);

