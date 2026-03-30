import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status") || "fail";
    
    // Redirect back to dashboard with failure or cancel status
    const redirectUrl = new URL(`/dashboard/purchase-coin?status=${status}`, req.url);
    return NextResponse.redirect(redirectUrl, 303);
  } catch (error) {
    console.error("SSL Verify Error:", error);
    return NextResponse.redirect(new URL("/dashboard/purchase-coin?status=error", req.url), 303);
  }
}
