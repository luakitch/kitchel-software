import type { Metadata } from "next";
import { site } from "@/lib/site";
import { DeepCutContent } from "./deep-cut-content";

export const metadata: Metadata = {
  title: "Deep Cut | Spin Journal",
  description:
    "Log the needle, keep the shelf, see the habit. Spin journal for vinyl: shelf, spins with notes and tags, and stats for albums and sides.",
};

const featureBlocks = [
  {
    title: "Your collection, one row at a time",
    items: [
      "Shelf rows store artist, title, year, label, and whatever detail you choose to enter.",
      "Sort and filter from the shelf, open a release for full detail, and jump straight into Log spin.",
      "Search ties into Discogs release data so you can add a pressing with artwork and track listing when a match exists.",
      "Artwork can follow the Apple Music catalog on device (when Music access is granted), use Discogs imagery from search, or fall back to a neutral default.",
    ],
  },
  {
    title: "Spins with context, not just timestamps",
    items: [
      "Each spin stores date, time, optional free-form notes, and tags (mood, room, genre, or your own vocabulary) for later filtering.",
      "When per-track durations exist on the release, log a full-LP listen or restrict to Side A / Side B so listen-time estimates use real side length, not a generic timer.",
      "When track metadata is thin, choose a fixed session length (30 / 45 / 60 / 90 minutes) or leave the session open-ended.",
      "Spin history stays queryable even if you later remove a record from the shelf, so your archive does not lose past listens.",
    ],
  },
  {
    title: "Recents and analytics",
    items: [
      "Recents orders by latest spin with one-tap paths back to the release when it is still on shelf.",
      "Stats aggregate spin counts, total listen time, weekday histograms, and current streaks from logged data only.",
      "Breakdowns compare full-album listens versus side-based sessions when your logs include that distinction.",
      "Rankings surface top artists and top albums from spin counts over the window you care about.",
    ],
  },
  {
    title: "Release lookup and artwork",
    items: [
      "Discogs API calls power release search and artwork retrieval; failures from rate limits or network errors surface as retryable errors in the UI.",
      "MusicKit-backed catalog artwork is optional and gated behind system Music authorization.",
      "StoreKit handles Deep Cut Plus subscription state; restore is available from Profile, and renewal or cancellation follows Apple’s subscription settings.",
    ],
  },
] as const;

export default function DeepCutPage() {
  return <DeepCutContent storeUrl={site.deepCutAppStoreUrl} featureBlocks={featureBlocks} />;
}
