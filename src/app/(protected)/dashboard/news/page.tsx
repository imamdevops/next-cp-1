import { NewsList } from "@/features/news/views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News Management",
  description: "News management dashboard.",
};

export default function NewsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">News</h2>
      </div>
      <div className="h-full flex-1 flex-col space-y-8 md:flex">
        <NewsList />
      </div>
    </div>
  );
}
