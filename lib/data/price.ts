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
  { service: "Разове відвідування", newPrice: "300₴" },
  { service: "Абонемент 12 занять/місяць", oldPrice: "3600₴", newPrice: "3000₴" },
  { service: "Абонемент 8 занять/місяць", oldPrice: "2400₴", newPrice: "2200₴" },
  {
    service:
      "Абонемент 2 гуртки/місяць (можна обрати лише 3 види занять на місяць, абонемент не переноситься на інші заняття)",
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
