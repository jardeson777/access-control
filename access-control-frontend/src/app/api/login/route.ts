import { NextRequest } from "next/server";
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const body = await request.json();

  const output = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
  });

  const data = await output.json();

  if (!data.accessToken) Response.json({ status: 401, message: "Unauthorized", success: false });

  cookies().set('accessToken', data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60, // 1 hour
    path: '/',
    sameSite: 'lax',
    secure: true,
  });

  return Response.json({ status: 200, message: "OK", success: true });
}