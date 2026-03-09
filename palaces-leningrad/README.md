# Дворцы Ленинградской области — Цифровая экскурсия

Концептуальный сайт-экскурсия в стиле Modern Heritage / Minimalist Chic.

## Tech Stack

- **Framework:** Next.js 14 (App Router) + React 18
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, Lenis (smooth scroll)
- **Icons:** Lucide React

## Цветовая палитра

| Название      | Hex       | Использование          |
|---------------|-----------|------------------------|
| Cloud Dancer  | `#F0EEE9` | Основной фон           |
| Brass         | `#C9A46B` | Акценты, кнопки        |
| Charcoal      | `#2F2F2F` | Текст, тонкие акценты  |
| Sage          | `#B2AC88` | Дополнительные акценты |
| Sand          | `#E7D8C6` | Подложки               |

## Структура проекта

```
src/
├── app/
│   ├── layout.tsx          # Корневой layout, шрифты
│   ├── template.tsx        # Shared Layout Transitions
│   ├── page.tsx            # Главная страница
│   └── palace/[slug]/
│       └── page.tsx        # Страница дворца
├── components/
│   ├── CustomCursor.tsx    # Кастомный курсор
│   ├── LenisProvider.tsx   # Плавный скролл
│   ├── HeroSection.tsx     # Hero с параллаксом
│   ├── HistoricalIntro.tsx # Историческая справка
│   ├── PalaceGrid.tsx      # Сетка дворцов
│   ├── BackToGallery.tsx   # Кнопка «Назад в галерею»
│   ├── RevealText.tsx      # Анимация текста
│   └── RevealBlock.tsx     # Fade-in up блоки
└── data/
    └── palaces.ts          # Данные дворцов
```

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Особенности

- Параллакс Hero-секция
- Lenis Smooth Scroll
- Кастомный курсор (отключается на touch-устройствах)
- Reveal-анимации при скролле (fade-in up)
- Shared Layout Transitions между страницами
- Hover scale 1.05 на изображениях
- Word-by-word reveal для заголовков
- Адаптивная вёрстка

## Изображения

Используются плейсхолдеры с Unsplash. В production рекомендуется заменить на реальные фото дворцов.
