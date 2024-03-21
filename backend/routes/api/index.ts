import { type Server } from "bun";

// eslint-disable-next-line @typescript-eslint/require-await
export default async function (
  {}: Record<string, string>,
  _request: Request,
  _server: Server,
) {
  return new Response("hello");
}
