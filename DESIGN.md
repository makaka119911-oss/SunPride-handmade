# Sun Pride Macramé — DESIGN.md

> Адаптировано из практики Refero Styles: editorial luxury + warm handmade. Источник правды для Cursor/агента.

## Бренд

- **Смысл:** женская сила, богиня, ручная работа, уверенность на фотосессии и у моря.
- **Тон:** тёплый премиум, не холодный tech; не «AI-лендинг» (никаких Inter, фиолетовых градиентов, generic SaaS).
- **Контент:** реальные фото VK/TG, hero.mp4 — не AI-генерация.

## Палитра

| Token | Hex | Использование |
|-------|-----|----------------|
| cream | `#faf6f0` | фон страницы |
| sand | `#e8dfd4` | секции, теги |
| terracotta | `#b86b4a` | CTA, акценты |
| gold | `#c9a962` | eyebrow, italic, декор |
| charcoal | `#2c2419` | текст, hero, contact |

## Типографика

- **Display:** Cormorant Garamond — заголовки, цитаты, крупные цифры.
- **Body:** Nunito — UI, кнопки, описания.
- **Ритм:** eyebrow (0.78rem, uppercase, letter-spacing 0.14em) → h1/h2 → lead → body.

## Компоненты

- **Hero:** dual-layer video (blur bg + contain fg), градиент charcoal, scroll cue.
- **Marquee:** бегущая строка ключевых слов бренда.
- **Course cards:** 3:4 фото, `center top`, hover lift + zoom.
- **Works bento:** 1 featured tile (2×2), остальные в сетке.
- **Philosophy:** 3 колонки с крупными цифрами (не дублировать старый «pillars» блок).
- **About:** портрет 3:4 + pull-quote.
- **Contact:** тёмный gradient box, ghost + primary CTA.

## Motion

- `--ease: cubic-bezier(0.22, 1, 0.36, 1)`
- `.reveal` + IntersectionObserver; stagger через `--reveal-delay`
- `prefers-reduced-motion`: без видео и анимаций

## Файлы

- `index.html` — разметка
- `assets/css/style.css` — все стили
- `assets/js/main.js` — header, burger, waitlist, reveal, marquee pause on hover

## Не делать

- Возвращать тёмную Beatus-палитру без запроса.
- `object-fit: cover` на узких hero-фото без `center top` на портретах.
- Копировать чужой Refero design.md 1:1.
