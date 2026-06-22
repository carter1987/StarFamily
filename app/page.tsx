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
import type { EventItem, GalleryItem } from "@/lib/types";
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

async function getEvents(): Promise<EventItem[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "events", "data.json");
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as EventItem[];
  } catch {
    return [];
  }
}

export default async function Home() {
  const [galleryItems, events] = await Promise.all([getGalleryItems(), getEvents()]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Team />
        <Events events={events} />
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
