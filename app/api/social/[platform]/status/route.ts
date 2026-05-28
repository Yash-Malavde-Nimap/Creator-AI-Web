import { NextRequest, NextResponse } from 'next/server';

import { OAUTH_COOKIES } from '@/lib/oauth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params;

  const accessToken = req.cookies.get(OAUTH_COOKIES.accessToken(platform))?.value;
  const username    = req.cookies.get(OAUTH_COOKIES.username(platform))?.value ?? '';

  if (!accessToken) {
    return NextResponse.json({ connected: false });
  }

  return NextResponse.json({ connected: true, username });
}
