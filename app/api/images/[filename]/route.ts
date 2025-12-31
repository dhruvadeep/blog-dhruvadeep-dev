import { getImage } from "@/lib/db/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const filename = (await params).filename;
  const image = await getImage(filename);

  if (!image) {
    return new NextResponse("Image not found", { status: 404 });
  }

  return new NextResponse(new Uint8Array(image.data), {
    headers: {
      "Content-Type": image.mime_type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
