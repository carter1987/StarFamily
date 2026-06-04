import { About } from "@/components/About";
import { Clubs } from "@/components/Clubs";
import { Cooperation } from "@/components/Cooperation";
import { Events } from "@/components/Events";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Price } from "@/components/Price";
import { Schedule } from "@/components/Schedule";
import { Team } from "@/components/Team";
import type { GalleryItem } from "@/lib/types";
import { readFile } from "fs/promises";
import path from "path";

async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "gallery", "data.json");
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as GalleryItem[];
  } catch {
    return [];
  }
}

export default async function Home() {
  const galleryItems = await getGalleryItems();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Team />
        <Events />
        <Gallery items={galleryItems} />
        <Schedule />
        <Price />
        <Clubs />
        <Cooperation />
      </main>
      <Footer />
    </>
  );
}
