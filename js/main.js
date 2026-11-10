'use strict';
const $ = (selector) => document.querySelector(selector);
const envelope = $('#envelope');
const invitation = $('#invitation');
const schedule = $('#scheduleDialog');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let opening = false;
let returnFocus = envelope;

// Render editable text safely; no content is interpreted as markup.
document.querySelectorAll('[data-content]').forEach((element) => {
  element.textContent = CONFIG[element.dataset.content] || '';
});
// The three semantic cards have a readable HTML fallback; config owns their content.
CONFIG.categories.forEach((category) => {
  const card = document.querySelector(`[data-format="${category.id}"]`);
  if (!card) return;
  card.querySelector('h4').textContent = category.name;
  card.querySelector('.format-english').textContent = category.english;
  card.querySelector('p').textContent = category.subtitle;
  card.querySelector('use').setAttribute('href', `#${category.icon}`);
});

CONFIG.schedule.forEach((item) => {
  const row = document.createElement('li');
  const time = document.createElement('time');
  const text = document.createElement('div');
  const title = document.createElement('strong');
  const detail = document.createElement('small');
  time.textContent = item.time;
  title.textContent = item.title;
  detail.textContent = item.detail;
  text.append(title, detail);
  row.append(time, text);
  $('#timeline').append(row);
});

function openInvitation(event) {
  if (opening || invitation.open) return;
  opening = true;
  returnFocus = event.currentTarget;
  envelope.classList.add('opening');
  document.body.classList.add('dialog-open');
  envelope.setAttribute('aria-expanded', 'true');
  if (!reducedMotion.matches && navigator.vibrate) navigator.vibrate(12);
  setTimeout(() => {
    invitation.showModal();
    invitation.scrollTo({ top: 0, behavior: 'instant' });
    $('#closeInvite').focus({ preventScroll: true });
    opening = false;
  }, reducedMotion.matches ? 0 : 520);
}
function closeDialog(dialog) {
  if (!dialog.open || dialog.classList.contains('closing')) return;
  dialog.classList.add('closing');
  setTimeout(() => {
    dialog.close();
    dialog.classList.remove('closing');
  }, reducedMotion.matches ? 0 : 240);
}
envelope.setAttribute('aria-controls', 'invitation');
envelope.setAttribute('aria-expanded', 'false');

// A single click handles touch, mouse and keyboard without duplicate touch firing.
envelope.addEventListener('click', openInvitation);
$('#openLink').addEventListener('click', openInvitation);
// Passive touch feedback never blocks native scrolling or pinch zoom.
envelope.addEventListener('touchstart', () => envelope.classList.add('touching'), { passive: true });
['touchend', 'touchcancel'].forEach((type) => envelope.addEventListener(type, () => envelope.classList.remove('touching'), { passive: true }));
$('#closeInvite').addEventListener('click', () => closeDialog(invitation));
$('#scheduleButton').addEventListener('click', () => schedule.showModal());
$('#closeSchedule').addEventListener('click', () => closeDialog(schedule));
[invitation, schedule].forEach((dialog) => {
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeDialog(dialog); });
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeDialog(dialog);
  });
});
invitation.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  envelope.classList.remove('opening');
  envelope.setAttribute('aria-expanded', 'false');
  returnFocus.focus({ preventScroll: true });
});
schedule.addEventListener('close', () => $('#scheduleButton').focus({ preventScroll: true }));

// Гүйлгэх үед хэсгүүдийг зөөлөн гаргана (IntersectionObserver байхгүй үед шууд харагдана)
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealItems = invitation.querySelectorAll('.portrait-arch, .dedication, .welcome, .date-block, .location, .format-card, .actions, .signoff, .memories figure, .invite-footer');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('rv-in'); io.unobserve(entry.target); }
    });
  }, { root: invitation, threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  let cardIndex = 0;
  revealItems.forEach((el) => {
    el.classList.add('rv');
    if (el.classList.contains('format-card')) el.style.setProperty('--d', `${(cardIndex++ % 3) * 90}ms`);
  });
  invitation.addEventListener('close', () => revealItems.forEach((el) => { el.classList.remove('rv-in'); io.observe(el); }));
  revealItems.forEach((el) => io.observe(el));
}
