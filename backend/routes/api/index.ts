import { type Server } from "bun";

export default async function (
  {}: Record<string, string>,
  _request: Request,
  _server: Server,
) {
  return new Response("hello");
}
