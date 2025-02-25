import { NewsForm } from "@/features/news/components/news-form";
import { getNewsById } from "@/features/news/api/news";
import { Metadata } from "next";

import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit News",
  description: "Edit news article.",
};

interface EditNewsPageProps {
  params: {
    id: string;
  };
}

export default async function EditNewsPage({ params }: EditNewsPageProps) {
  const news = await getNewsById(params.id);

  if (!news) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Edit News</h2>
      <div className="grid gap-4">
        <NewsForm news={news} />
      </div>
    </div>
  );
}
