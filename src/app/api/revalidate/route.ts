import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

const SANITY_REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET;

/**
 * GET /api/revalidate?secret=XXX
 * Manual revalidation trigger — use from a browser to test.
 * Remove this handler once the webhook is confirmed working.
 */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!secret || secret !== SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({
      message: "Invalid secret",
      debug: {
        envDefined: Boolean(SANITY_REVALIDATE_SECRET),
        envLength: SANITY_REVALIDATE_SECRET?.length ?? 0,
        receivedLength: secret?.length ?? 0,
      },
    }, { status: 401 });
  }

  revalidateTag("sanity", "default");
  revalidatePath("/fr");
  revalidatePath("/en");

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type?: string;
      slug?: { current?: string };
    }>(req, SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 },
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: "Bad request: missing _type" },
        { status: 400 },
      );
    }

    // Revalidate the tag used by all Sanity fetches
    revalidateTag("sanity", "default");

    // Always revalidate the homepage (all sections live there)
    revalidatePath("/fr");
    revalidatePath("/en");

    // If a project was modified, also revalidate its detail page
    if (body._type === "project" && body.slug?.current) {
      revalidatePath(`/fr/projects/${body.slug.current}`);
      revalidatePath(`/en/projects/${body.slug.current}`);
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: body._type,
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
