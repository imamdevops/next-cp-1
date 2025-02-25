import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NEXT_AUTH_OPTIONS } from "@/lib/auth";
import { deleteNews, getNewsById, updateNews } from "@/features/news/api/news";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const news = await getNewsById(params.id);
    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(NEXT_AUTH_OPTIONS);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const news = await updateNews(params.id, body);
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(NEXT_AUTH_OPTIONS);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await deleteNews(params.id);
    return NextResponse.json({ message: "News deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}
