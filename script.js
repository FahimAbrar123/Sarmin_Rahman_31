
  // Surprise wish button
  const wish = document.getElementById('wish');
  const btn = document.getElementById('showWishBtn');
  btn.addEventListener('click', () => {
    wish.style.opacity = '1';
    btn.style.display = 'none';
    btn.setAttribute('aria-expanded', 'true');
  });

  // Floating hearts animation
  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.setProperty('--x', (Math.random() * 100 - 50) + 'px');
    heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
  }
  setInterval(createHeart, 400);

  // Slideshow without buttons, swipe/touch only
  const slides = document.getElementById('slides');
  const images = slides.querySelectorAll('img');
  const imageWish = document.getElementById('imageWish');

  // Wishes for each image
  const wishes = [
    "Wishing you endless happiness! 🎉",
    "May your smile shine brighter today! 😊",
    "Cheers to many more wonderful years! 🥂",
    "Hope your day is as amazing as you! 🌟",
    "Sending you love and warm hugs! 🤗",
    "May all your dreams take flight! ✨",
    "Keep shining, birthday star! ⭐",
    "To health, wealth, and happiness! 💰",
    "Celebrate big, laugh loud! 😂",
    "You deserve all the best today! 🎁"
  ];

  let currentIndex = 0;
  const slideWidth = 320; // must match CSS image width

  function updateSlidePosition() {
    slides.style.transition = 'transform 0.5s ease-in-out';
    slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    imageWish.textContent = wishes[currentIndex];
  }
  updateSlidePosition();

  // Swipe support for Redmi Note 6 Pro
  let startX = 0;
  let isDragging = false;

  slides.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
    slides.style.transition = 'none';
  });
  slides.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    slides.style.transform = `translateX(${-currentIndex * slideWidth + diff}px)`;
  });
  slides.addEventListener('touchend', e => {
    isDragging = false;
    slides.style.transition = 'transform 0.5s ease-in-out';
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (diff > 50) {
      // Swipe right — show previous slide, wrap to last if at start
      currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    } else if (diff < -50) {
      // Swipe left — show next slide, wrap to first if at end
      currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    }
    updateSlidePosition();
  });

  // Countdown Timer
  const countdown = document.getElementById('countdown');

  // Set your birthday here (YYYY, MM-1, DD, HH, MM, SS)
  // Note: Months are zero-based: January = 0
  const birthday = new Date(2025, 11, 25, 0, 0, 0); // Example: Dec 25, 2025 midnight

  function updateCountdown() {
    const now = new Date();
    let diff = birthday - now;

    if (diff < 0) {
      countdown.textContent = "🎉 Happy Birthday! 🎉";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    countdown.textContent = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Confetti animation
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;
  function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const confettiCount = 150;
  const confettiPieces = [];

  class Confetti {
    constructor() {
      this.x = Math.random() * W;
      this.y = Math.random() * H - H;
      this.r = (Math.random() * 6) + 4;
      this.d = (Math.random() * confettiCount) + 10;
      this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
      this.tilt = (Math.random() * 10) - 10;
      this.tiltAngleIncrement = (Math.random() * 0.07) + 0.05;
      this.tiltAngle = 0;
    }
    update() {
      this.tiltAngle += this.tiltAngleIncrement;
      this.y += (Math.cos(this.d) + 3 + this.r / 2) / 2;
      this.x += Math.sin(this.d);
      this.tilt = Math.sin(this.tiltAngle) * 15;

      if (this.y > H) {
        this.x = Math.random() * W;
        this.y = -10;
        this.tilt = (Math.random() * 10) - 10;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.lineWidth = this.r / 2;
      ctx.strokeStyle = this.color;
      ctx.moveTo(this.x + this.tilt + this.r / 4, this.y);
      ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4);
      ctx.stroke();
    }
  }
  for (let i = 0; i < confettiCount; i++) {
    confettiPieces.push(new Confetti());
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, W, H);
    confettiPieces.forEach(c => {
      c.update();
      c.draw();
    });
    requestAnimationFrame(animateConfetti);
  }
  animateConfetti();
