// ===== HEARTS CANVAS =====
const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const hearts = [];
const heartChars = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '🌹', '✨', '💫', '🩷', '💘'];

class Heart {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -30;
    this.size = Math.random() * 22 + 10;
    this.speed = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.sway = Math.random() * 2 - 1;
    this.swaySpeed = Math.random() * 0.02 + 0.01;
    this.angle = 0;
    this.char = heartChars[Math.floor(Math.random() * heartChars.length)];
  }
  update() {
    this.y += this.speed;
    this.angle += this.swaySpeed;
    this.x += Math.sin(this.angle) * this.sway;
    if (this.y > canvas.height + 30) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.font = `${this.size}px serif`;
    ctx.fillText(this.char, this.x, this.y);
    ctx.restore();
  }
}

for (let i = 0; i < 35; i++) {
  const h = new Heart();
  h.y = Math.random() * canvas.height;
  hearts.push(h);
}

// Music beat sync
let beatScale = 1;
function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => { h.update(); h.draw(); });
  requestAnimationFrame(animateHearts);
}
animateHearts();

// ===== PAGES =====
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ===== PASSWORD =====
function checkPassword() {
  const val = document.getElementById('passwordInput').value.trim();
  const err = document.getElementById('errorMsg');
  if (val === 'جيلان' || val === 'جيلان ' || val.toLowerCase() === 'jilan') {
    err.style.display = 'none';
    showPage('page-welcome');
    startMusic();
  } else {
    err.style.display = 'block';
    err.style.animation = 'none';
    void err.offsetWidth;
    err.style.animation = 'shake 0.5s ease';
  }
}

// ===== WELCOME -> QUIZ =====
function goToQuiz() {
  showPage('page-quiz');
}

// ===== QUIZ =====
let quizAttempts = 0;
function checkQuiz(idx) {
  const fb = document.getElementById('quizFeedback');
  fb.className = 'quiz-feedback';
  if (idx === 2) {
    fb.className = 'quiz-feedback correct';
    fb.innerHTML = '🎉✨ صح!!! وأكثر من كدا كمان!! 🥹💕<br>بحبك أكتر من الكون كله يا جيلان 🌌💖<br>يالا نكمل الموقع 😍';
    setTimeout(() => {
      showPage('page-main');
      document.body.classList.add('scrollable');
      initMainPage();
    }, 2500);
  } else {
    quizAttempts++;
    fb.className = 'quiz-feedback wrong';
    if (quizAttempts < 3) {
      fb.innerHTML = '😅 قالوا يعني بحبك قدر كدا بس!! غلط! اختاري تاني 😤💕';
    } else {
      fb.innerHTML = '😭 يا جيلان الإجابة مش في الكلام الإجابة في قلبك 💕 جربي مرة تانية!';
    }
  }
  fb.style.display = 'block';
}

// ===== MUSIC =====
const audio = document.getElementById('bgMusic');
let musicPlaying = false;

function startMusic() {
  audio.volume = 0.4;
  audio.play().then(() => {
    musicPlaying = true;
    document.getElementById('musicPlayer').style.display = 'flex';
    document.getElementById('musicBtn').textContent = '⏸';
    document.getElementById('musicIcon').classList.remove('paused');
  }).catch(() => { });
}

function toggleMusic() {
  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
    document.getElementById('musicBtn').textContent = '▶';
    document.getElementById('musicIcon').classList.add('paused');
  } else {
    audio.play();
    musicPlaying = true;
    document.getElementById('musicBtn').textContent = '⏸';
    document.getElementById('musicIcon').classList.remove('paused');
  }
}

// ===== INIT MAIN =====
let mainInited = false;
function initMainPage() {
  if (mainInited) return;
  mainInited = true;
  initCounter();
  initGallery();
  initTypewriter();
  initLoveList();
  initNotifications();
  initScrollReveal();
}

// ===== COUNTER =====
function initCounter() {
  const start = new Date('2022-11-25T00:00:00');
  function update() {
    const now = new Date();
    const diff = now - start;
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const days = totalDays % 30;
    const hours = now.getHours();
    document.getElementById('cnt-years').textContent = years;
    document.getElementById('cnt-months').textContent = months;
    document.getElementById('cnt-days').textContent = days;
    document.getElementById('cnt-hours').textContent = hours;
    document.getElementById('total-days').textContent = totalDays.toLocaleString('ar');
    // Birthday countdown (May 1)
    const currentYear = now.getFullYear();
    let bday = new Date(currentYear, 6, 4); // July 4
    if (now > bday) bday = new Date(currentYear + 1, 6, 4);
    const bdDiff = bday - now;
    const bdDays = Math.floor(bdDiff / (1000 * 60 * 60 * 24));
    const bdHours = Math.floor((bdDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const bdMins = Math.floor((bdDiff % (1000 * 60 * 60)) / (1000 * 60));
    const bdSecs = Math.floor((bdDiff % (1000 * 60)) / 1000);
    document.getElementById('bd-days').textContent = bdDays;
    document.getElementById('bd-hours').textContent = bdHours;
    document.getElementById('bd-mins').textContent = bdMins;
    document.getElementById('bd-secs').textContent = bdSecs;
  }
  update();
  setInterval(update, 1000);
}

// ===== GALLERY =====
function initGallery() {
  const images = [
    'Pins/6789916ddef0cd1906c50d1d94b3c0d3.jpg',
    'Pins/695e588b2eb13ae8678d903bfde6a015.jpg',
    'Pins/70a3e31379d42047b1f8ff3ef4ba42e5.jpg',
    'Pins/7453c6cafe818fd55dd7b311d154c7f2.jpg',
    'Pins/97be57f939f141c63dd0e86b4f62c31c.jpg',
    'Pins/a4e78880e674e9e5372c3686da0c6184.jpg',
    'Pins/a696add8a46ad03dad22939005f8e05e.jpg',
    'Pins/b64fc394c4e77100147d43cdadddcf4d.jpg',
    'Pins/b8c3b9eb3d806d8cb8a1e257a88edac5.jpg',
    'Pins/cb3aa162833d133744bf23e89da2bf29.jpg',
    'Pins/d49aae5393d6a9b06532d4ff18f70ddb.jpg',
    'Pins/dd8b1dc7a6e46dde489f99ade784bb73.jpg',
    'Pins/f0fbf043b73494ee406102a0111fe332.jpg',
    'Pins/f95cfbed5e8b193b0b9f3dc30f943d86.jpg',
    'Pins/received_1253393008919449.jpeg',
    'Pins/received_170961289068518.jpeg',
    'Pins/received_232645242474863.jpeg',
    'Pins/annie-spratt-fDghTk7Typw-unsplash.jpg',
    'Pins/element5-digital-MEzqoN8p6C0-unsplash.jpg',
    'Pins/pexels-karolina-grabowska-4197491.jpg',
    'Pins/pexels-ksenia-chernaya-5807048.jpg',
  ];
  const grid = document.getElementById('gallery');
  images.forEach(src => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'صورة حب 💕';
    img.onerror = () => { div.style.display = 'none'; };
    div.appendChild(img);
    div.addEventListener('click', () => {
      div.style.transform = 'scale(1.15)';
      spawnHeartBurst(div.getBoundingClientRect().left, div.getBoundingClientRect().top);
      setTimeout(() => div.style.transform = '', 500);
    });
    grid.appendChild(div);
  });
}

// ===== TYPEWRITER =====
function initTypewriter() {
  const text = `يا جيلان...\n\nأنا سعيد بيكِ شديد — يعني ما في زول شايف قيمتك زي الشايفها أنا 💖\n\nيا أحن وأجمل بنوتة عرفتها في حياتي... ✨\n\nانتي سمحة حلوة — حلا فوق ما تتصوري!\nأول مرة شفتك — سحرتيني 🌟\nضحكتك تجنني... 🙈\nكلامك كله حلو وظريف 🎀\n\nبحب أسمعك وبحب لمن تحكي لي 💌\nبحب أعرف كل حاجة تحصل معاكِ 🤍\nخليتيني أحب أتكلم مع نفسي وأضحك وأنا بتخيلك 😅💕\n\nما داير أضيع لحظة منك\nولا ثانية\nولا نَفَس 🥹\n\nيا كلمة بحبك — دي كلمة كبيرة ما هينة\nوأنا بالجد بالجد بالجد...\n\n💕 بحبك يا جيلان 💕`;
  const el = document.getElementById('typewriter-text');
  let i = 0;
  function type() {
    if (i < text.length) {
      if (text[i] === '\n') {
        el.innerHTML += '<br>';
      } else {
        el.innerHTML += text[i];
      }
      i++;
      setTimeout(type, 45);
    }
  }
  // Start after scroll into view
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { type(); obs.disconnect(); }
  });
  obs.observe(el);
}

// ===== LOVE LIST =====
function initLoveList() {
  const items = [
    { icon: '😊', text: 'ضحكتك اللي تجنن' },
    { icon: '🎶', text: 'صوتك الحلو' },
    { icon: '💬', text: 'طريقة كلامك' },
    { icon: '🌟', text: 'ظرافتك ولطافتك' },
    { icon: '🤍', text: 'قلبك الطيب' },
    { icon: '👁️', text: 'ملامحك الساحرة' },
    { icon: '🕊️', text: 'روحك الهادية' },
    { icon: '📚', text: 'طموحك وجدك' },
    { icon: '🌸', text: 'رقتك وحنانك' },
    { icon: '✨', text: 'بريقك الخاص' },
    { icon: '🥰', text: 'طريقة نظرتك' },
    { icon: '🤲', text: 'خوفك من ربك' },
    { icon: '🫀', text: 'حنانك على الناس' },

  ];
  const list = document.getElementById('loveList');
  items.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'love-item';
    div.innerHTML = `<div class="love-item-icon">${item.icon}</div><div class="love-item-text">${item.text}</div>`;
    div.style.transitionDelay = `${idx * 0.1}s`;
    list.appendChild(div);
  });
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        list.querySelectorAll('.love-item').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 150);
        });
        obs.disconnect();
      }
    });
  });
  obs.observe(list);
}

// ===== NOTIFICATIONS =====
function initNotifications() {
  const msgs = [
    '💌 رسالة جديدة من قلبي',
    '🔔 تذكير: انتي أحلى واحدة 🌹',
    '❤️ شخص بحبك موت الحين 😭',
    '💕 قلبي بيسألك عنك دايماً',
    '🌟 الله يحفظك يا نور عيني',
    '💍 عقبال ما نقعد سوى يا جيلان',
    '🎵 أغنية بفكرك فيها الآن...',
    '🌹 بحبك بحبك بحبك موت!',
    '🥹 تعبت من بعدك متى نكون سوا؟',
    '✨ انتي أحلى حاجة في يومي',
    '🌙 حتى في النوم بتجي في بالي',
    '💫 لو في زول بحبك أكتر مني كذاب',
    '🔕 تنبيه: الزول دا مجنون بيك',
    '🌍 لو الدنيا تغيرت أنا ما بتغير',
    '🫀 قلبك الطيب مالي الدنيا حنان',
    '💖 بحبك قد الدنيا و أكتر 💖',
    '🎀 جيلان — جيلان — جيلان... بشبع منها؟ لا 🥰',
  ];
  let idx = 0;
  function showNotif() {
    const container = document.getElementById('notifications');
    const div = document.createElement('div');
    div.className = 'notification';
    div.textContent = msgs[idx % msgs.length];
    idx++;
    container.appendChild(div);
    setTimeout(() => div.remove(), 5000);
  }
  setTimeout(showNotif, 3000);
  setInterval(showNotif, 8000);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// ===== GIFT EXPERIENCE =====
let noAttempts = 0;

function startGiftExperience() {
  document.getElementById('giftStartBtn').style.display = 'none';
  document.getElementById('giftSection').querySelector('.section-title').style.display = 'none';
  document.getElementById('giftSection').querySelector('p').style.display = 'none';
  document.getElementById('giftStep1').style.display = 'block';
  document.getElementById('giftStep1').style.animation = 'fadeInUp 0.8s ease';
}

function showProposal() {
  document.getElementById('giftStep1').style.display = 'none';
  document.getElementById('giftStep2').style.display = 'block';
  document.getElementById('giftStep2').style.animation = 'fadeInUp 0.8s ease';
}

function escapeNoBtn() {
  noAttempts++;
  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');
  const container = document.getElementById('giftStep2');
  const containerRect = container.getBoundingClientRect();

  // Move No button to random position
  const maxX = containerRect.width - 100;
  const maxY = 300;
  const newX = Math.random() * maxX - maxX / 2;
  const newY = Math.random() * maxY - maxY / 2;
  noBtn.style.position = 'relative';
  noBtn.style.left = newX + 'px';
  noBtn.style.top = newY + 'px';
  noBtn.style.transition = 'all 0.2s ease';

  // Shake and grow Yes button
  yesBtn.style.animation = 'none';
  void yesBtn.offsetWidth;
  yesBtn.style.animation = 'shakeYes 0.5s ease';
  const scale = 1 + (noAttempts * 0.08);
  yesBtn.style.transform = `scale(${Math.min(scale, 1.6)})`;

  // After 5 attempts: remove No, center Yes, show angry emoji
  if (noAttempts >= 5) {
    noBtn.style.display = 'none';
    document.getElementById('angryMsg').style.display = 'block';
    document.getElementById('angryMsg').style.animation = 'fadeInUp 0.5s ease';
    yesBtn.style.transform = 'scale(1.6)';
    yesBtn.style.margin = '30px auto';
    yesBtn.style.display = 'block';
    yesBtn.style.animation = 'shakeYes 0.8s ease infinite';
    document.getElementById('proposalButtons').style.justifyContent = 'center';
  }
}

function acceptProposal() {
  document.getElementById('giftStep2').style.display = 'none';
  document.getElementById('giftStep3').style.display = 'block';
  document.getElementById('giftStep3').style.animation = 'fadeInUp 0.8s ease';

  // Spawn celebration emojis
  const celebEmojis = ['🎉', '🥳', '🎊', '💃', '🕺', '🎆', '✨', '💖', '💕', '🌟', '🎈', '🎀', '😍', '💐', '🌹', '🦋'];
  const container = document.getElementById('celebrationEmojis');
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const span = document.createElement('span');
      span.className = 'celeb-emoji';
      span.textContent = celebEmojis[Math.floor(Math.random() * celebEmojis.length)];
      span.style.left = Math.random() * 100 + '%';
      span.style.animationDelay = Math.random() * 0.5 + 's';
      span.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
      container.appendChild(span);
      setTimeout(() => span.remove(), 4000);
    }, i * 100);
  }

  // Also spawn explosion hearts
  for (let i = 0; i < 60; i++) {
    setTimeout(() => spawnExplosionHeart(), i * 80);
  }
}

function openGiftBox() {
  document.getElementById('giftStep3').style.display = 'none';
  document.getElementById('giftStep4').style.display = 'block';
  document.getElementById('giftStep4').style.animation = 'fadeInUp 1s ease';

  // Massive hearts explosion
  for (let i = 0; i < 120; i++) {
    setTimeout(() => spawnExplosionHeart(), i * 50);
  }

  // Spawn continuous hearts for ring reveal
  let burstCount = 0;
  const burstInterval = setInterval(() => {
    for (let i = 0; i < 5; i++) {
      spawnExplosionHeart();
    }
    burstCount++;
    if (burstCount > 30) clearInterval(burstInterval);
  }, 300);
}

function spawnExplosionHeart() {
  const emojis = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '🌹', '💘', '🩷'];
  const el = document.createElement('div');
  el.className = 'explosion-heart';
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.setProperty('--tx', (Math.random() * 300 - 150) + 'px');
  el.style.setProperty('--ty', (Math.random() * 300 - 150) + 'px');
  el.style.setProperty('--dur', (Math.random() * 1.5 + 0.5) + 's');
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2000);
}

function spawnHeartBurst(x, y) {
  for (let i = 0; i < 10; i++) {
    const el = document.createElement('div');
    el.className = 'explosion-heart';
    el.textContent = '💕';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.setProperty('--tx', (Math.random() * 200 - 100) + 'px');
    el.style.setProperty('--ty', (Math.random() * 200 - 100) + 'px');
    el.style.setProperty('--dur', '1s');
    el.style.fontSize = '1.5rem';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1100);
  }
}

// ===== CLICK HEARTS =====
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
  spawnHeartBurst(e.clientX, e.clientY);
});
