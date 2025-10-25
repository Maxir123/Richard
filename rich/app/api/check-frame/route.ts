// app/api/check-frame/route.ts
import { NextResponse } from "next/server";

function safeDecode(param: string | null) {
  if (!param) return null;
  try {
    return decodeURIComponent(param);
  } catch {
    return param;
  }
}

function getErrorMessage(err: unknown): string {
  // Narrow unknown to an object that might have a message property
  if (typeof err === "object" && err !== null) {
    const maybeMessage = (err as { message?: unknown }).message;
    if (typeof maybeMessage === "string") return maybeMessage;
  }
  return "Fetch failed";
}

export async function GET(req: Request) {
  const urlObj = new URL(req.url);
  const raw = safeDecode(urlObj.searchParams.get("url"));
  if (!raw) {
    return NextResponse.json({ ok: false, message: "Missing url" }, { status: 400 });
  }

  // Only allow http/https
  if (!/^https?:\/\//i.test(raw)) {
    return NextResponse.json({ ok: false, message: "Invalid url" }, { status: 400 });
  }

  try {
    // Do a HEAD first — some servers don't like HEAD, fallback to GET
    let res = await fetch(raw, { method: "HEAD", redirect: "follow" });
    if (!res.ok) {
      // fallback to GET if HEAD returns non-200 (still fine for checking headers)
      res = await fetch(raw, { method: "GET", redirect: "follow" });
    }

    // Normalize header keys into a typed map
    const headers: Record<string, string | null> = {};
    res.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value ?? null;
    });

    const xFrame = (headers["x-frame-options"] ?? "").toLowerCase();
    const csp = headers["content-security-policy"] ?? headers["x-content-security-policy"] ?? "";

    // If X-Frame-Options exists and is DENY or SAMEORIGIN, not frameable (unless same origin)
    const hasXFrameDeny =
      xFrame.includes("deny") ||
      xFrame.includes("sameorigin") ||
      xFrame.includes("same-origin");

    // If CSP contains frame-ancestors and it's not permissive, not frameable
    // crude permissive check: allow if frame-ancestors contains * or 'self' or https:
    const frameAncestorsMatch = /frame-ancestors\s+([^;]+)/i.exec(csp ?? "");
    const hasFrameAncestors =
      Boolean(frameAncestorsMatch) &&
      !/frame-ancestors\s+(\*|'self'|https:)/i.test(frameAncestorsMatch?.[0] ?? "");

    const frameable = !(hasXFrameDeny || hasFrameAncestors);

    return NextResponse.json({
      ok: true,
      frameable,
      headers: {
        "x-frame-options": headers["x-frame-options"] ?? null,
        "content-security-policy": csp ?? null,
      },
    });
  } catch (err: unknown) {
    const message = getErrorMessage(err);

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      { status: 502 }
    );
  }
}
