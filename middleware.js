import { NextResponse } from "next/dist/server/web/spec-extension/response";

export default function middleware(req) {
  let verify = req.cookies.get("loggedIn");
  let url = req.url;

  // Check for logged in user
  if (!verify && url.includes('/presidentDashboard')) {
    return NextResponse.redirect("http://localhost:3000/login");
  }

  // Add any additional checks, for example, role-based access control
  let role = req.cookies.get("roleName");
  if (role !== 'President' && url.includes('/presidentDashboard')) {
    return NextResponse.redirect("http://localhost:3000/login");
  }

  return NextResponse.next(); // Proceed with the request if authorized
}
