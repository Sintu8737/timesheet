import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('NextAuth signin request:', body);
    
    return NextResponse.json({ 
      message: 'NextAuth route is working',
      received: body 
    });
  } catch (error) {
    console.error('NextAuth route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'NextAuth route is accessible',
    timestamp: new Date().toISOString(),
  });
}
