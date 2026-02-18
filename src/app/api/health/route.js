import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'API is working',
    timestamp: new Date().toISOString(),
    env: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NODE_ENV: process.env.NODE_ENV,
    }
  });
}
