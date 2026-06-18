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

- **Hero:** poster + lazy video (dual-layer), отключение на saveData/2g.
- **Marquee:** бегущая строка ключевых слов бренда.
- **Courses:** horizontal scroll на мобиле; `play-btn` + `data-video-url` для embed.
- **Works:** bento + lightbox; ссылка в соцсеть отдельно.
- **Philosophy:** паттерн `pattern-knot.svg`.
- **Order:** 3 шага заказа.
- **Reviews:** цитаты (обновлять из VK/TG).
- **Sticky CTA:** Telegram, только мобиле.
- **PWA:** `manifest.webmanifest`, иконки 192/512.
- **Аналитика:** `assets/js/site-config.js` → `yandexMetrikaId`.

## Motion

- `--ease: cubic-bezier(0.22, 1, 0.36, 1)`
- `.reveal` + IntersectionObserver; stagger через `--reveal-delay`
- `prefers-reduced-motion`: без видео и анимаций

## Файлы

- `index.html` — разметка
- `assets/css/style.css` — все стили
- `assets/js/site-config.js` — Metrika ID, ссылки
- `assets/js/main.js` — UI, lightbox, lazy video, sticky CTA
- `scripts/optimize-assets.py` — WebP + иконки + poster

## Чеклист перед push (mobile QA)

- [ ] **320px** — нет горизонтального скролла (`scrollWidth === clientWidth`)
- [ ] **390px** — курсы листаются горизонтально, кнопки full-width
- [ ] **768px** — bento-галерея, 2 колонки курсов
- [ ] **1024px** — 3 колонки курсов, desktop layout
- [ ] Hero: poster виден до загрузки видео
- [ ] Lightbox открывается/закрывается (Esc, backdrop)
- [ ] Sticky CTA только на мобиле, скрывается у contact
- [ ] `data-track` клики (после вставки Metrika ID)
- [ ] Ctrl+F5 или `?v=N` — сброс кэша CSS/JS

## Не делать

- Возвращать тёмную Beatus-палитру без запроса.
- `object-fit: cover` на портретах без `center top`.
- Копировать чужой Refero design.md 1:1.
- Выдумывать отзывы без согласия — заменить на реальные из VK/TG.

## Видео курсов

Когда появится ролик — на кнопке `.play-btn` убрать `data-video-soon`, задать `data-video-url` (mp4, YouTube или VK).

```html
<button type="button" class="play-btn" data-video-url="https://..." aria-label="Смотреть превью">
```

## Метрика

1. metrika.yandex.ru → создать счётчик
2. В `site-config.js`: `yandexMetrikaId: 12345678`
3. Цели совпадают с `data-track` на кнопках
