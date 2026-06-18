# Sun Pride Macramé — лендинг

Сайт-витрина для **Sun Pride** (макраме, Татьяна Солнечная): будущие видео мастер-классы, портфолио, контакты.

## Ссылки

| | |
|---|---|
| **GitHub** | https://github.com/makaka119911-oss/SunPride-handmade |
| **GitHub Pages** | https://makaka119911-oss.github.io/SunPride-handmade/ |
| **VK** | https://vk.com/sunpride_handmade |
| **Telegram канал** | https://t.me/macramesunpride |
| **Заказы / заявки** | https://t.me/Tan4ik77G |

## Стек

Статика: `index.html` + `assets/` + `DESIGN.md` — без сборки.

## Настройка

**Яндекс.Метрика:** в `assets/js/site-config.js` вставить `yandexMetrikaId: 'XXXXXX'`.

**Превью курса:** на `.play-btn` задать `data-video-url="..."`, убрать `data-video-soon`.

**Оптимизация медиа:** `python scripts/optimize-assets.py` (WebP, иконки PWA, poster).

## PWA

`manifest.webmanifest` + `apple-touch-icon.png` — «На экран Домой» на iPhone.

## Деплой

Push в `main` → GitHub Pages. После правок — поднять `?v=` в `index.html`.

## Статус

- [x] Editorial v7–v9: lightbox, sticky TG, отзывы, «Как заказать», WebP, lazy hero
- [x] Реальные фото VK, hero video (~5 МБ)
- [ ] Metrika ID от владельца
- [ ] Реальные отзывы (заменить шаблонные)
- [ ] Оплата курсов