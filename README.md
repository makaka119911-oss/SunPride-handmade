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

Статика: `index.html` + `assets/css/style.css` + `assets/js/main.js` — без сборки.

## Локальный просмотр

```powershell
cd SunPride-handmade
python -m http.server 3010
```

Открыть http://127.0.0.1:3010

Или: `Agents\preview-sunpride.ps1`

## Деплой

Push в `main` → GitHub Pages (ветка `main`, папка `/`).

После правок CSS/JS — поднять `?v=` в `index.html` для сброса кэша.

## Статус MVP

- [x] Макет лендинга, 3 карточки курсов
- [x] Кнопка «Хочу на старт» → Telegram @Tan4ik77G
- [x] **Редизайн v2** — Beatus-палитра + бордо/лаванда/фиолет, видео hero, логотип без ☀️
- [ ] Реальные фото из VK/TG вместо placeholder-градиентов
- [ ] Оплата (ЮKassa / Prodamus / GetCourse)

### Дизайн v2 (2026-06-13)

Референс: https://www.beatushoehlen.swiss/en/ — полноэкранный hero, тёмные секции, 3 колонки.

- Шрифты: Jost + Fraunces
- Видео: `assets/video/hero.mp4` (~20 МБ)

Карточка проекта в Obsidian: `Проекты/SunPride-handmade.md`
