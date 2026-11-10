/* Edit invitation content here. Times use Ulaanbaatar (UTC+08:00). */
const CONFIG = Object.freeze({
  eyebrow: 'ХҮНДЭТГЭЛИЙН УРИЛГА',
  dedication: 'Нэрт сурган хүмүүжүүлэгч, хөгжмийн зохиолч, Хөгжим бүжгийн дунд сургуулийн Модон үлээвэр хөгжмийн анхны Монгол багш, СТА, Дэд мастер Л.\u00a0Чогдовын дурсгалд зориулсан шатрын нөхөрсөг тэмцээнд',
  welcome: 'эрхэм таныг хүрэлцэн ирэхийг хүндэтгэн урьж байна.',
  date: '2026.11.26 | Пүрэв гараг | 09:30 цагт',
  categories: [
    { id: 'rapid', name: 'Рапид', english: 'Rapid Chess', subtitle: 'Түргэвчилсэн тоглолт', icon: 'piece-knight' },
    { id: 'blitz', name: 'Блиц', english: 'Blitz Chess', subtitle: 'Түргэн тоглолт', icon: 'piece-queen' },
    { id: 'solving', name: 'Бодлого бодолт', english: 'Chess Problem Solving', subtitle: 'Шатрын бодлого, композици', icon: 'piece-king' }
  ],
  venue: 'Дүүрэн төв · 4 давхар',
  organizer: 'ФМ, УШ Ч.Мөнхбат',
  schedule: [
    { time: '09:30', title: 'Тэмцээн эхэлнэ', detail: 'Дүүрэн төв · 4 давхар' },
    { time: '—', title: 'Рапид', detail: 'Түргэвчилсэн · 20 минут + 20 секундын уналт · 1–5 байр, шилдэг эмэгтэй' },
    { time: '—', title: 'Блиц', detail: 'Түргэн · 3 минут + 2 секундын уналт · 1–3 байр' },
    { time: '—', title: 'Бодлого бодолт', detail: '2 нүүдлийн 2, 3 нүүдлийн 1 бодлого · 1–3 байр · МШХ-ны дотоод чансаа тооцно' }
  ]
});
