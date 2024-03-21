import { type Server } from "bun";
import { sql } from "@/db";
import { parse } from "@/validate";
import { IsString } from "class-validator";
import { DatabaseError } from "pg";

class LoginRequest {
  @IsString()
  githubToken: string;
  constructor(githubToken: string) {
    this.githubToken = githubToken;
  }
}

export default async function handler(
  {},
  request: Request,
  _server: Server,
): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  const { githubToken } = await parse(LoginRequest, request);

  const response = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer " + githubToken,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    console.error("error getting GitHub user:", await response.json());
    throw new Error("error getting GitHub user");
  }

  const { email, id: githubUserId } = (await response.json()) as {
    email: string;
    id: number;
  };

  try {
    await sql`
      insert into users (email, oauth_provider, oauth_foreign_id)
      values (${email}, 'github', ${githubUserId})
      on conflict on constraint max_1_user_per_foreign_user do update set email = ${email}
      returning id
    `;
  } catch (e) {
    if (
      e instanceof DatabaseError &&
      e.code === "23505" && // unique constraint violation
      e.constraint === "max_1_user_per_email"
    ) {
      return new Response(
        JSON.stringify({
          error: "Email already in use with a different login provider",
        }),
      );
    } else {
      throw e;
    }
  }
  return new Response(JSON.stringify({ ok: true }));
}
