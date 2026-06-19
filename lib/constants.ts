export const NAV_ITEMS = [
  { label: "Про нас", href: "#pro-nas" },
  { label: "Події", href: "#podiyi" },
  { label: "Галерея", href: "#galereya" },
  { label: "Графік", href: "#grafik" },
  { label: "Прайс", href: "#prais" },
  { label: "Гуртки", href: "#hurtky" },
  { label: "Співпраця", href: "#spivpratsya" },
] as const;

export const PHONE_CONTACTS = [
  {
    city: "Київ",
    contacts: [{ name: "Анна", phone: "+380 (97) 481 29 50" }],
  },
  {
    city: "Вінниця",
    contacts: [
      { name: "Анна", phone: "+380 (93) 630 47 05" },
      { name: "Леся", phone: "+380 (68) 988 08 16" },
    ],
  },
] as const;

export function phoneTelHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export const ADDRESSES = {
  kyiv: "м. Київ, вул. Анни Ахматової 44а",
  vinnytsia: "м. Вінниця, просп. Космонавтів 53",
} as const;

export const INSTAGRAM_URL = "https://www.instagram.com/starfamilyua/";

export const MAPS = {
  kyiv: "https://maps.google.com/maps?q=%D0%B2%D1%83%D0%BB.+%D0%90%D0%BD%D0%BD%D0%B8+%D0%90%D1%85%D0%BC%D0%B0%D1%82%D0%BE%D0%B2%D0%BE%D1%97+44%D0%B0,+%D0%9A%D0%B8%D1%97%D0%B2&hl=uk&z=16&output=embed",
  vinnytsia:
    "https://maps.google.com/maps?q=%D0%BF%D1%80%D0%BE%D1%81%D0%BF.+%D0%9A%D0%BE%D1%81%D0%BC%D0%BE%D0%BD%D0%B0%D0%B2%D1%82%D1%96%D0%B2+53,+%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8F&hl=uk&z=16&output=embed",
} as const;
