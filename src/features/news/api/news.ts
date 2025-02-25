import prisma from "@/db";
import slugify from "slugify";
import { News } from "../types";

export async function getNews(): Promise<News[]> {
  return await prisma.news.findMany({
    include: {
      createdBy: {
        select: {
          username: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getNewsById(id: string): Promise<News | null> {
  return await prisma.news.findUnique({
    where: { id },
    include: {
      createdBy: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });
}

export async function createNews(data: {
  headline: string;
  body: string;
  headlineImage?: string;
  tags: string[];
  userId: string;
}): Promise<News> {
  const slug = slugify(data.headline, { lower: true, strict: true });

  return await prisma.news.create({
    data: {
      ...data,
      slug,
    },
    include: {
      createdBy: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });
}

export async function updateNews(
  id: string,
  data: {
    headline?: string;
    body?: string;
    headlineImage?: string;
    tags?: string[];
    published?: boolean;
  }
): Promise<News> {
  const updates: any = { ...data };

  if (data.headline) {
    updates.slug = slugify(data.headline, { lower: true, strict: true });
  }

  return await prisma.news.update({
    where: { id },
    data: updates,
    include: {
      createdBy: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });
}

export async function deleteNews(id: string): Promise<News> {
  return await prisma.news.delete({
    where: { id },
    include: {
      createdBy: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });
}
