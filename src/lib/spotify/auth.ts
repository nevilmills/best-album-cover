"use server";

let token: string | null = null;
let expiresAt = 0;

export async function getAccessToken(): Promise<string> {
  if (token && Date.now() < expiresAt) return token;

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  token = data.access_token;
  expiresAt = Date.now() + data.expires_in * 1000 - 60 * 1000;

  return token!;
}
