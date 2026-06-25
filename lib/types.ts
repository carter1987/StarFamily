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
  orientation?: "vertical" | "horizontal";
};

export type GalleryItem = GalleryPhotoItem | GalleryVideoItem;

export function galleryItemKey(item: GalleryItem, index: number) {
  const id = item.type === "photo" ? item.src : item.youtubeId;
  return `${item.type}-${id}-${index}`;
}

export type EventItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  photos: string[];
};

export type FormaPhotoItem = {
  src: string;
  description: string;
};
