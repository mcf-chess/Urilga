# Л. Чогдовын дурсгалын шатрын тэмцээний урилга

Нэрт сурган хүмүүжүүлэгч, хөгжмийн зохиолч Л. Чогдов багшийн дурсгалд зориулсан
шатрын нөхөрсөг тэмцээний интерактив урилга.

- **Огноо:** 2026 оны 11 дүгээр сарын 26, Пүрэв гараг, 09:30
- **Байршил:** Дүүрэн төв, 4 давхар
- **Төрлүүд:** Рапид · Блиц · Бодлого бодолт (МШХ-ны дотоод чансаа тооцно)
- **Зохион байгуулагч:** ФМ, УШ Ч.Мөнхбат

## Бүтэц

```
chogdov-urilga/
├── index.html              # Үндсэн хуудас (HTML бүтэц)
├── css/
│   └── style.css           # Бүх загвар, өнгө, хөдөлгөөн
├── js/
│   ├── config.js           # ⚙️ Зураг, хуваарийг ЭНД засна
│   ├── audio.js            # Цаасны чимээ, хонхны дуу (Web Audio API)
│   └── main.js             # Дугтуй нээх/хаах, зургийн слайд, модал
└── assets/
    └── images/
        ├── chogdov-group.jpg
        └── chogdov-memory.jpg
```

## Түгээмэл засварууд

| Юу засах | Хаана |
|---|---|
| Зураг нэмэх, солих | Зургаа `assets/images/`-д хийж, `js/config.js`-ийн `photos` жагсаалтад нэмнэ |
| Хуваарийн цаг | `js/config.js` → `schedule` |
| Урилгын бичвэр | `index.html` |
| Өнгө, фонт | `css/style.css` → `:root` хэсэг |

## Компьютер дээр үзэх

`index.html` файлыг хөтөч (Chrome, Edge) дээр давхар дарж нээнэ.
VS Code-ийн **Live Server** өргөтгөл ашиглавал засвар хийх бүрт автоматаар шинэчлэгдэнэ.

## GitHub дээр байршуулах

```bash
git init
git add .
git commit -m "Урилга"
git branch -M main
git remote add origin https://github.com/ТАНЫ-НЭР/chogdov-urilga.git
git push -u origin main
```

Дараа нь GitHub → **Settings → Pages** → Branch: `main`, `/ (root)` → **Save**.
Сайт `https://ТАНЫ-НЭР.github.io/chogdov-urilga/` хаягаар нээгдэнэ.

Засвар оруулсны дараа:

```bash
git add .
git commit -m "Засвар"
git push
```
