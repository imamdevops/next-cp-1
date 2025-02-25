import { NewsForm } from "@/features/news/components/news-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create News",
  description: "Create a new news article.",
};

export default function CreateNewsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Create News</h2>
      <div className="grid gap-4">
        <NewsForm />
      </div>
    </div>
  );
}
