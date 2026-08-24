@AGENTS.md

# StarFamily Project Rules

## СТЕК
Next.js 16.2.7, React 19, Tailwind CSS 4, framer-motion
Деплой: Vercel | Код: D:\Project\starfamily

## ДИЗАЙН-СИСТЕМА — НЕ ЗМІНЮВАТИ НІКОЛИ
- Фон: #0D0D0D | Картки: #1A1A1A
- Золото: #C9A84C, #F0D060
- Текст: #FFFFFF, muted: #A0A0A0
- Шрифти: Playfair Display (заголовки), Montserrat (текст)
- Стиль: Premium Dark Gold

## ДЖЕРЕЛА ДАНИХ
- Прайс → lib/data/price.ts
- Графік → lib/data/schedule.ts
- Гуртки → lib/data/clubs.ts
- Галерея → public/gallery/data.json
- Події → public/events/data.json
- Телефони, адреси → lib/constants.ts

## КРИТИЧНІ ПРАВИЛА
- НЕ змінювати дизайн, кольори, шрифти, анімації
- НЕ змінювати desktop таблиця / mobile картки для прайсу
- Дитячий Кураж — не повертати ніколи
- В меню писати "Star Family Store" (не "Форма")
- Мінімальний diff — тільки те що в задачі
- Завжди перевіряти mobile і desktop
- Після змін запускати npm run build

## МАРШРУТИ
/ → app/page.tsx
/forma → app/forma/page.tsx
layout → app/layout.tsx

## СТРУКТУРА ГОЛОВНОЇ (порядок не змінювати)
Hero → About → Team → Events → Gallery → Schedule → Price → Clubs → Cooperation → Footer
