import { type Server } from "bun";

const GITHUB_CLIENT_ID = Bun.env["GITHUB_CLIENT_ID"];
const GITHUB_CLIENT_SECRET = Bun.env["GITHUB_CLIENT_SECRET"];

export default async function handle(request: Request, _server: Server) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return new Response("missing code parameter", { status: 400 });
  }
  const body = new FormData();
  body.set("client_id", GITHUB_CLIENT_ID);
  body.set("client_secret", GITHUB_CLIENT_SECRET);
  body.set("code", code);
  const result = await fetch("https://github.com/login/oauth/access_token", {
    body,
    headers: { accept: "application/json" },
  });
  if (result.ok) {
    return "welcome";
  } else {
    console.error(await result.text());
    return "invalid state";
  }
}
