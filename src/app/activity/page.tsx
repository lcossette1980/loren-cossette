import { getActivity } from "@/data/activity";
import { ActivityPageClient } from "./ActivityPageClient";

// Re-fetch the Multco activity feed every hour
export const revalidate = 3600;

export default async function ActivityPage() {
  const entries = await getActivity();
  return <ActivityPageClient entries={entries} />;
}
