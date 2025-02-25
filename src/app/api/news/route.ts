import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NEXT_AUTH_OPTIONS } from "@/lib/auth";
import { createNews, getNews } from "@/features/news/api/news";

export async function GET() {
  try {
    const news = await getNews();
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(NEXT_AUTH_OPTIONS);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const news = await createNews({ ...body, userId: session.user.id });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}
