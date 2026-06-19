export type GalleryPhotoItem = {
  type: "photo";
  src: string;
  description: string;
};

export type GalleryVideoItem = {
  type: "video";
  youtubeId: string;
  description: string;
};

export type GalleryItem = GalleryPhotoItem | GalleryVideoItem;

export function galleryItemKey(item: GalleryItem, index: number) {
  return item.type === "photo" ? item.src : `${item.youtubeId}-${index}`;
}
