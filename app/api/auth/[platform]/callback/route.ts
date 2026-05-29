import { NextRequest, NextResponse } from "next/server";

import {
  getPlatformConfig,
  OAUTH_COOKIES,
  cookieOpts,
  TOKEN_MAX_AGE,
  appUrl,
} from "@/lib/oauth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ platform: string }> },
) {
  const { platform } = await params;
  const { searchParams } = req.nextUrl;
  const base = appUrl();

  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  console.log(
    `[OAuth/${platform}] callback — code:${!!code} state:${!!state} error:${error}`,
  );

  /* ── Guard: provider returned an error or no code ───────────────────── */
  if (error || !code) {
    console.error(`[OAuth/${platform}] denied — error:${error}`);
    return NextResponse.redirect(`${base}/social-media?error=oauth_denied`);
  }

  /* ── Guard: state mismatch (CSRF) ───────────────────────────────────── */
  const storedState = req.cookies.get(OAUTH_COOKIES.state(platform))?.value;
  if (!storedState || storedState !== state) {
    return NextResponse.redirect(`${base}/social-media?error=state_mismatch`);
  }

  const config = getPlatformConfig(platform);
  if (!config) {
    return NextResponse.redirect(`${base}/social-media?error=unknown_platform`);
  }

  const redirectUri = `${base}/api/auth/${platform}/callback`;

  try {
    /* ── Token exchange ─────────────────────────────────────────────────── */
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    });

    const headers: Record<string, string> = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    if (config.useBasicAuthForToken) {
      // X (Twitter): credentials go in Authorization header, not the body
      const creds = Buffer.from(
        `${config.clientId}:${config.clientSecret}`,
      ).toString("base64");
      headers["Authorization"] = `Basic ${creds}`;
    } else {
      body.set("client_id", config.clientId);
      body.set("client_secret", config.clientSecret);
    }

    if (config.pkce) {
      const verifier = req.cookies.get(
        OAUTH_COOKIES.codeVerifier(platform),
      )?.value;
      if (!verifier) {
        return NextResponse.redirect(
          `${base}/social-media?error=missing_verifier`,
        );
      }
      body.set("code_verifier", verifier);
    }

    const tokenRes = await fetch(config.tokenUrl, {
      method: "POST",
      headers,
      body: body.toString(),
    });

    if (!tokenRes.ok) {
      console.error(
        `[OAuth/${platform}] token exchange failed:`,
        await tokenRes.text(),
      );
      return NextResponse.redirect(`${base}/social-media?error=token_failed`);
    }

    const tokenData = (await tokenRes.json()) as Record<string, unknown>;
    const accessToken = String(tokenData.access_token ?? "");

    /* ── Fetch user profile ─────────────────────────────────────────────── */
    let username = "";
    try {
      const profileRes = await fetch(config.userInfoUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (profileRes.ok) {
        username = config.parseUsername(
          (await profileRes.json()) as Record<string, unknown>,
        );
      }
    } catch {
      // Non-fatal — card will just show no username
    }

    /* ── Persist tokens in cookies and redirect back ────────────────────── */
    const response = NextResponse.redirect(
      `${base}/social-media?connected=true&platform=${platform}`,
    );

    // HTTP-only: keeps the access token out of JS reach
    response.cookies.set(
      OAUTH_COOKIES.accessToken(platform),
      accessToken,
      cookieOpts(TOKEN_MAX_AGE),
    );

    // Non-httpOnly: the status endpoint reads this to return the display name
    if (username) {
      response.cookies.set(
        OAUTH_COOKIES.username(platform),
        username,
        cookieOpts(TOKEN_MAX_AGE, false),
      );
    }

    // Clean up one-time cookies
    response.cookies.delete(OAUTH_COOKIES.state(platform));
    if (config.pkce)
      response.cookies.delete(OAUTH_COOKIES.codeVerifier(platform));

    return response;
  } catch (err) {
    console.error(`[OAuth/${platform}] callback error:`, err);
    return NextResponse.redirect(`${base}/social-media?error=callback_failed`);
  }
}
