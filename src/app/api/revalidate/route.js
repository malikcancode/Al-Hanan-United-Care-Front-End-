import { revalidateTag } from "next/cache";

const TAGS = ["services", "doctors", "settings"];

// Called by the backend after an admin change so the site shows fresh data at once.
export async function POST(request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { tag } = await request.json().catch(() => ({}));
  if (!TAGS.includes(tag)) {
    return Response.json({ success: false, message: "Unknown tag" }, { status: 400 });
  }

  revalidateTag(tag, { expire: 0 });
  return Response.json({ success: true, revalidated: tag });
}
