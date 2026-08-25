export type KyivPriceRow = {
  service: string;
  price?: string;
};

export type KyivPriceSection = {
  title: string;
  rows: KyivPriceRow[];
};

export type VinnytsiaPriceRow = {
  service: string;
  oldPrice?: string;
  newPrice: string;
};

export const KYIV_PRICE_SECTIONS: KyivPriceSection[] = [
  {
    title: "Дитячі напрямки",
    rows: [
      { service: "Разове групове заняття", price: "400₴" },
      { service: "Абонемент 12 занять", price: "4000₴" },
      { service: "Індивідуальне заняття", price: "900₴" },
    ],
  },
  {
    title: "Дорослі напрямки 18+",
    rows: [
      { service: "Разове заняття", price: "550₴" },
      { service: "Абонемент 8 занять", price: "4000₴" },
      { service: "Абонемент 12 занять", price: "5500₴" },
      { service: "Індивідуальне заняття", price: "1400₴" },
    ],
  },
  {
    title: "Heels",
    rows: [
      { service: "Разове заняття", price: "550₴" },
      { service: "Абонемент 8 занять", price: "4000₴" },
      { service: "Абонемент 12 занять", price: "5600₴" },
      { service: "Індивідуальне заняття", price: "від 1200₴" },
    ],
  },
  {
    title: "Індивідуальні заняття з зірками України",
    rows: [
      {
        service: "Євген Кот / Наталія Татарінцева",
        price: "ціну уточнюйте у адміністратора",
      },
    ],
  },
  {
    title: "Умови відвідування",
    rows: [
      { service: "• Термін дії абонементу — 30 днів" },
      {
        service:
          "• Перенос заняття можливий за умови попередження адміністратора не пізніше ніж за 12 годин до початку заняття. Пропущене заняття можна відпрацювати в іншій групі відповідного рівня протягом терміну дії абонементу",
      },
      {
        service:
          "• У разі повідомлення менш ніж за 12 годин або відсутності без попередження заняття вважається використаним",
      },
      {
        service:
          "• Для абонементів доступна одноразова заморозка до 14 календарних днів за попереднім погодженням з адміністратором",
      },
    ],
  },
];

export const VINNYTSIA_PRICES: VinnytsiaPriceRow[] = [
  { service: "Разове відвідування", newPrice: "300₴" },
  { service: "Абонемент 12 занять/місяць", oldPrice: "3600₴", newPrice: "3000₴" },
  { service: "Абонемент 8 занять/місяць", oldPrice: "2400₴", newPrice: "2200₴" },
  {
    service: "Абонемент 2 гуртки/місяць",
    oldPrice: "6000₴",
    newPrice: "5500₴",
  },
  { service: "Абонемент 3 гуртки/місяць", oldPrice: "9000₴", newPrice: "7800₴" },
  {
    service:
      "VIP на місяць (вільне відвідування занять згідно розкладу та віку дитини кожного дня протягом місяця)",
    newPrice: "8800₴",
  },
  { service: "Індивідуальне заняття", newPrice: "650₴" },
  { service: "Абонемент індив. заняття", newPrice: "4800₴" },
];
