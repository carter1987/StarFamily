export type KyivPriceRow = {
  service: string;
  price: string;
};

export type VinnytsiaPriceRow = {
  service: string;
  oldPrice?: string;
  newPrice: string;
};

export const KYIV_PRICES: KyivPriceRow[] = [
  { service: "Разове відвідування", price: "350₴" },
  { service: "Безліміт на 1 день (будь-які заняття за графіком)", price: "1000₴ (-40%)" },
  { service: "1 абонемент — 12 занять/місяць", price: "3500₴ (-17%)" },
  { service: "2 абонементи — 24 заняття/місяць", price: "6500₴ (-22%)" },
  { service: "3 абонементи — 36 занять/місяць", price: "9500₴ (-25%)" },
  { service: "VIP на місяць — безліміт ~60 занять", price: "12000₴ (-43%)" },
  { service: "Індивідуальне заняття", price: "700₴" },
];

export const VINNYTSIA_PRICES: VinnytsiaPriceRow[] = [
  { service: "Разове відвідування", newPrice: "250₴" },
  { service: "Абонемент 12 занять/місяць", oldPrice: "3000₴", newPrice: "2500₴" },
  { service: "Абонемент 8 занять/місяць", oldPrice: "2000₴", newPrice: "1800₴" },
  { service: "Абонемент 2 гуртки/місяць", oldPrice: "5000₴", newPrice: "4500₴" },
  { service: "VIP на місяць — 3 гуртки", oldPrice: "7500₴", newPrice: "6200₴" },
  { service: "Індивідуальне соло", newPrice: "550₴" },
  { service: "Індивідуальне дует", newPrice: "800₴" },
  { service: "Абонемент 8 занять соло", newPrice: "4000₴" },
  { service: "Абонемент 8 занять дует", newPrice: "6000₴" },
  { service: "Дитячий Кураж — 1 день", newPrice: "500₴" },
  { service: "Дитячий Кураж — 3 дні", newPrice: "1400₴" },
  { service: "Дитячий Кураж — абонемент місяць (20 днів)", newPrice: "8000₴" },
];

export const VINNYTSIA_PRICE_NOTE =
  "Дитячий Кураж — місце де дитина може провести час весело та корисно під час літніх канікул. Кожного дня з понеділка по п'ятницю з 10:00 до 14:00";
