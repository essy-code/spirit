import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: any) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // ✅ FIX: cast as any (safe here)
    const user: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (user.role !== "ADMIN" && user.role !== "SUPERADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard"],
};