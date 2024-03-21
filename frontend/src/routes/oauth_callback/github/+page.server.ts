import { authorizationHeader } from "$lib/server/githubOAuth";
import type { PageServerLoad } from "./$types";

// https://datatracker.ietf.org/doc/html/rfc6749#section-5.1
type OAuth2Response =
  | {
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token?: string;
      scope?: string;
    }
  | {
      error: string;
      error_description?: string;
      error_uri?: string;
    };

export const load: PageServerLoad = async ({ url }) => {
  const code = url.searchParams.get("code");
  if (!code) {
    return { ok: false };
  }
  const body = new FormData();
  body.set("grant_type", "client_credentials");
  body.set("code", code);
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body,
    headers: {
      accept: "application/json",
      authorization: authorizationHeader,
    },
  });
  const result = (await response.json()) as OAuth2Response;
  if ("access_token" in result) {
    console.log(
      `logged in successfully; got access token ${result.access_token}`,
    );
    return { ok: true };
  } else if (result.error === "bad_verification_code") {
    return { ok: false };
  } else {
    console.error(
      "error in GitHub OAuth authorisation:",
      response.status,
      result,
    );
    throw new Error("error in GitHub OAuth authorisation");
  }
};
