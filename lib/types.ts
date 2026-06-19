export type GalleryPhotoItem = {
  type: "photo";
  src: string;
  description: string;
  category: string;
};

export type GalleryVideoItem = {
  type: "video";
  youtubeId: string;
  description: string;
  category: string;
};

export type GalleryItem = GalleryPhotoItem | GalleryVideoItem;

export function galleryItemKey(item: GalleryItem, index: number) {
  const id = item.type === "photo" ? item.src : item.youtubeId;
  return `${item.category}-${id}-${index}`;
}

export function getGalleryCategories(items: GalleryItem[]): string[] {
  const unique = [...new Set(items.map((item) => item.category))];
  return ["Всі", ...unique];
}
