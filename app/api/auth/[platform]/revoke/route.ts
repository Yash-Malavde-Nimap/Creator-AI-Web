import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { getPlatformConfig, OAUTH_COOKIES } from '@/lib/oauth';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params;
  const config = getPlatformConfig(platform);

  if (!config) {
    return NextResponse.json({ error: 'unknown_platform' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(OAUTH_COOKIES.accessToken(platform))?.value;

  if (accessToken && config.revokeUrl) {
    try {
      const body = new URLSearchParams({ token: accessToken });
      const headers: Record<string, string> = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      if (config.useBasicAuthForToken) {
        // X uses HTTP Basic Auth for token operations
        const creds = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64');
        headers['Authorization'] = `Basic ${creds}`;
        body.set('token_type_hint', 'access_token');
      } else {
        body.set('client_id',     config.clientId);
        body.set('client_secret', config.clientSecret);
      }

      await fetch(config.revokeUrl, {
        method: 'POST',
        headers,
        body: body.toString(),
      });
    } catch {
      // Revocation failed at provider — still clear local cookies
    }
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete(OAUTH_COOKIES.accessToken(platform));
  response.cookies.delete(OAUTH_COOKIES.username(platform));
  return response;
}
