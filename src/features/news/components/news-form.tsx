"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";
import { News } from "@/features/news/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("Enter the URL of the image:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-2 border-b p-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-slate-200" : ""}
      >
        Bold
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-slate-200" : ""}
      >
        Italic
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? "bg-slate-200" : ""
        }
      >
        H2
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-slate-200" : ""}
      >
        Bullet List
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={addImage}>
        Add Image
      </Button>
    </div>
  );
};

interface NewsFormProps {
  news?: News;
}

export function NewsForm({ news }: NewsFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [headline, setHeadline] = useState(news?.headline || "");
  const [headlineImage, setHeadlineImage] = useState(news?.headlineImage || "");
  const [tags, setTags] = useState(news?.tags?.join(", ") || "");
  const [published, setPublished] = useState(news?.published || false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Image, Link],
    content: news?.body || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      toast.error("You must be logged in to create/edit news");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        headline,
        body: editor?.getHTML() || "",
        headlineImage,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        published,
        userId: session.user.id,
      };

      const response = await fetch(
        news?.id ? `/api/news/${news.id}` : "/api/news",
        {
          method: news?.id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save news");
      }

      toast.success(
        news?.id ? "News updated successfully" : "News created successfully"
      );
      router.push("/dashboard/news");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save news");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="headline">Headline</Label>
        <Input
          id="headline"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="headlineImage">Headline Image URL</Label>
        <Input
          id="headlineImage"
          value={headlineImage}
          onChange={(e) => setHeadlineImage(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <div className="min-h-[500px] border rounded-md">
          <MenuBar editor={editor} />
          <div className="p-4">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4"
        />
        <Label htmlFor="published">Published</Label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : news ? "Update News" : "Create News"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
