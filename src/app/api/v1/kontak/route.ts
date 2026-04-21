import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { getPayloadClient } from "@/lib/payload";

// ---------------------------------------------------------------------------
// In-memory rate limiter — module-level, survives across requests in the same
// Node.js process. Key: client IP, value: last-submission timestamp (ms).
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 60 seconds

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

interface ContactBody {
  nama?: unknown;
  email?: unknown;
  telepon?: unknown;
  unit?: unknown;
  subjek?: unknown;
  pesan?: unknown;
}

interface ValidationErrors {
  [field: string]: string;
}

function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateBody(body: ContactBody): ValidationErrors {
  const errors: ValidationErrors = {};

  const nama = typeof body.nama === "string" ? body.nama.trim() : "";
  if (!nama) {
    errors.nama = "Nama wajib diisi.";
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email) {
    errors.email = "Email wajib diisi.";
  } else if (!validateEmail(email)) {
    errors.email = "Format email tidak valid.";
  }

  const unit = typeof body.unit === "string" ? body.unit.trim() : "";
  if (!unit) {
    errors.unit = "Unit tujuan wajib dipilih.";
  }

  const subjek = typeof body.subjek === "string" ? body.subjek.trim() : "";
  if (!subjek) {
    errors.subjek = "Subjek pesan wajib diisi.";
  }

  const pesan = typeof body.pesan === "string" ? body.pesan.trim() : "";
  if (!pesan) {
    errors.pesan = "Isi pesan wajib diisi.";
  } else if (pesan.length < 10) {
    errors.pesan = "Pesan minimal 10 karakter.";
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest): Promise<NextResponse> {
  // --- Rate limiting ---
  const headersList = await headers();
  const clientIp =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const lastSubmit = rateLimitMap.get(clientIp);
  if (lastSubmit !== undefined && now - lastSubmit < RATE_LIMIT_WINDOW_MS) {
    const retryAfter = Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - lastSubmit)) / 1000,
    );
    return NextResponse.json(
      {
        success: false,
        errors: {
          _: "Terlalu banyak permintaan. Silakan tunggu sebentar sebelum mengirim lagi.",
        },
      },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      },
    );
  }

  // --- Parse body ---
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { success: false, errors: { _: "Format request tidak valid." } },
      { status: 400 },
    );
  }

  // --- Validate ---
  const errors = validateBody(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  // Safe to cast after validation
  const nama = (body.nama as string).trim();
  const email = (body.email as string).trim();
  const telepon =
    typeof body.telepon === "string" ? body.telepon.trim() : undefined;
  const unit = (body.unit as string).trim();
  const subjek = (body.subjek as string).trim();
  const pesan = (body.pesan as string).trim();

  // --- Persist to CMS ---
  try {
    const payload = await getPayloadClient();

    await payload.create({
      collection: "pesan",
      data: {
        nama,
        email,
        ...(telepon ? { telepon } : {}),
        unit: unit as never,
        subjek,
        pesan,
        status: "baru",
        ipAddress: clientIp,
      },
    });
  } catch {
    // Do not expose internal errors to the caller
    return NextResponse.json(
      {
        success: false,
        errors: {
          _: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
        },
      },
      { status: 500 },
    );
  }

  // --- Update rate-limit timestamp after successful save ---
  rateLimitMap.set(clientIp, now);

  return NextResponse.json(
    {
      success: true,
      message:
        "Pesan Anda telah diterima. Kami akan menghubungi Anda segera.",
    },
    { status: 201 },
  );
}
