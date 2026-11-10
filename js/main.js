/* Урилгын үндсэн логик: нээх/хаах, зураг, модал */

/* =========================================================
   DOM лавлагаа
   ========================================================= */
const $ = (s) => document.querySelector(s);
const body       = document.body;
const envelope   = $('#envelope');
const inviteWrap = $('#inviteWrap');
const btnClose   = $('#btnClose');
const toastEl    = $('#toast');

/* Дууны товч */
function setSoundIcon(){
  const btn = $('#soundToggle');
  btn.querySelector('use').setAttribute('href', soundOn ? '#i-sound-on' : '#i-sound-off');
  btn.setAttribute('aria-label', soundOn ? 'Дуу унтраах' : 'Дуу асаах');
}
$('#soundToggle').addEventListener('click', () => {
  soundOn = !soundOn; setSoundIcon();
  if(soundOn) playChime();
});

/* =========================================================
   НЭЭХ / ХААХ логик
   ========================================================= */
let busy = false;

function openInvite(){
  if(busy || body.classList.contains('is-open')) return;
  busy = true;
  envelope.classList.add('opening');      // 1) таг нээгдэж, цаас дээш гарна
  playPaper(0.8, 0.4);
  setTimeout(() => {                       // 2) урилгын карт дэлгэгдэнэ
    body.classList.add('is-open');
    inviteWrap.setAttribute('aria-hidden', 'false');
    inviteWrap.scrollTop = 0;
    playPaper(0.6, 0.25);
    setTimeout(playChime, 350);
    setTimeout(() => { btnClose.focus({ preventScroll:true }); busy = false; }, 900);
  }, 1150);
}

function closeInvite(){
  if(busy || !body.classList.contains('is-open')) return;
  busy = true;
  playPaper(0.6, 0.3);
  body.classList.remove('is-open');        // 1) карт эвхэгдэнэ
  inviteWrap.setAttribute('aria-hidden', 'true');
  setTimeout(() => {                        // 2) дугтуйн таг хаагдана
    envelope.classList.remove('opening');
    playPaper(0.4, 0.25);
    setTimeout(() => { envelope.focus({ preventScroll:true }); busy = false; }, 800);
  }, 750);
}

envelope.addEventListener('click', openInvite);
btnClose.addEventListener('click', closeInvite);
/* Картын гадна (бараан дэвсгэр) дээр дарахад хаагдана */
inviteWrap.addEventListener('click', (e) => { if(e.target === inviteWrap) closeInvite(); });

/* Гарын товч: Esc — хаах */
document.addEventListener('keydown', (e) => {
  if(e.key !== 'Escape') return;
  const open = document.querySelector('.modal.show');
  if(open) return hideModal(open);
  closeInvite();
});

/* =========================================================
   ЗУРАГ — CONFIG эсвэл хэрэглэгчийн сонгосон файлаас
   ========================================================= */
const photoBox  = $('#photoBox');
const photoDots = $('#photoDots');
const photoCap  = $('#photoCaption');
let slides = [], slideIdx = 0, slideTimer = null;

/* Зургуудыг хүрээ дотор үүсгэнэ */
function buildSlides(list){
  photoBox.querySelectorAll('img').forEach(i => i.remove());
  photoDots.innerHTML = '';
  slides = list.map((p, i) => {
    const img = document.createElement('img');
    img.src = p.src; img.alt = p.caption || 'Л. Чогдов багш';
    img.decoding = 'async';
    if(p.position) img.style.objectPosition = p.position;
    photoBox.prepend(img);
    if(list.length > 1){
      const dot = document.createElement('button');
      dot.type = 'button'; dot.setAttribute('aria-label', `${i + 1}-р зураг`);
      dot.addEventListener('click', () => { showSlide(i); restartSlides(); });
      photoDots.appendChild(dot);
    }
    return { img, caption: p.caption };
  });
  $('#photoPlaceholder').style.display = slides.length ? 'none' : '';
  photoDots.style.display = slides.length > 1 ? '' : 'none';
  if(slides.length) showSlide(0);
}

function showSlide(i){
  slideIdx = (i + slides.length) % slides.length;
  slides.forEach((s, k) => s.img.classList.toggle('active', k === slideIdx));
  [...photoDots.children].forEach((d, k) => d.classList.toggle('active', k === slideIdx));
  if(slides[slideIdx].caption) photoCap.textContent = slides[slideIdx].caption;
}
function restartSlides(){
  clearInterval(slideTimer);
  if(slides.length > 1) slideTimer = setInterval(() => showSlide(slideIdx + 1), CONFIG.slideInterval);
}

/* Зураг дээр дарахад дараагийн зураг */
photoBox.addEventListener('click', (e) => {
  if(slides.length > 1 && !e.target.closest('label')){ showSlide(slideIdx + 1); restartSlides(); }
});

buildSlides(CONFIG.photos.filter(p => p.src));
restartSlides();

/* Зураггүй үед хэрэглэгч өөрөө зураг сонгож болно */
$('#photoInput').addEventListener('change', (e) => {
  const file = e.target.files && e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => { buildSlides([{ src: reader.result, caption: 'Л. Чогдов багш' }]); };
  reader.readAsDataURL(file);
});

/* =========================================================
   МОДАЛ, TOAST, CTA
   ========================================================= */
function showModal(m){ m.classList.add('show'); playPaper(0.35, 0.2); m.querySelector('[data-close]').focus(); }
function hideModal(m){ m.classList.remove('show'); }
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', (e) => { if(e.target === m || e.target.closest('[data-close]')) hideModal(m); });
});

let toastTimer;
function toast(msg){
  toastEl.textContent = msg; toastEl.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
}

/* Хуваарийг CONFIG-оос бөглөнө */
$('#timeline').innerHTML = CONFIG.schedule
  .map(s => `<li><time>${s.time}</time><span>${s.text}</span></li>`).join('');

$('#btnSchedule').addEventListener('click', () => showModal($('#scheduleModal')));
