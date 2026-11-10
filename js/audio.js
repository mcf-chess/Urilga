/* Дууны эффект — Web Audio API (гадны файлгүй) */

/* =========================================================
   ДУУ — Web Audio API (файлгүйгээр синтез хийнэ)
   ========================================================= */
let audioCtx = null;
let soundOn = true;

function ctx(){
  if(!audioCtx){
    const AC = window.AudioContext || window.webkitAudioContext;
    if(!AC) return null;
    audioCtx = new AC();
  }
  if(audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

/* Цаасны сэрчигнэх чимээ: шүүсэн noise + санамсаргүй "хагарал" */
function playPaper(duration = 0.7, volume = 0.35){
  if(!soundOn) return;
  const ac = ctx(); if(!ac) return;
  const len = Math.floor(ac.sampleRate * duration);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  let crackle = 0;
  for(let i = 0; i < len; i++){
    const t = i / len;
    if(Math.random() < 0.004) crackle = 0.6 + Math.random() * 0.4;  // шинэ "сэрчигнэл"
    crackle *= 0.9985;
    const env = Math.sin(Math.PI * t) ** 0.8;
    data[i] = (Math.random() * 2 - 1) * env * (0.25 + crackle);
  }
  const src = ac.createBufferSource(); src.buffer = buf;
  const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2600; bp.Q.value = 0.7;
  const hp = ac.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 700;
  const g = ac.createGain(); g.gain.value = volume;
  src.connect(bp).connect(hp).connect(g).connect(ac.destination);
  src.start();
}

/* Зөөлөн хөгжмийн хонх: арпеджио (C мажор) */
function playChime(){
  if(!soundOn) return;
  const ac = ctx(); if(!ac) return;
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
  const now = ac.currentTime;
  const master = ac.createGain(); master.gain.value = 0.18; master.connect(ac.destination);
  notes.forEach((f, i) => {
    const t = now + i * 0.13;
    ['sine','triangle'].forEach((type, k) => {
      const o = ac.createOscillator(); o.type = type; o.frequency.value = f * (k ? 2 : 1);
      const g = ac.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(k ? 0.12 : 0.5, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
      o.connect(g).connect(master); o.start(t); o.stop(t + 1.9);
    });
  });
}
