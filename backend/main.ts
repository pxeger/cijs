import { type Server } from "bun";
import {} from "./db"; // run migrations
import HTTPError from "./errors";

console.log(new Date(), "starting API");

interface Module<T> {
  default: T;
}
type Route = (
  params: Record<string, string>,
  request: Request,
  server: Server,
) => Promise<Response>;

const router = new Bun.FileSystemRouter({
  style: "nextjs",
  dir: "./routes",
});

Bun.serve({
  async fetch(request: Request, server: Server): Promise<Response> {
    const route = router.match(request);
    if (route === null) {
      return new Response("404 not found", { status: 404 });
    }
    const handlerModule = (await import(route.filePath)) as Module<Route>;
    try {
      return await handlerModule.default(route.params ?? {}, request, server);
    } catch (e) {
      if (e instanceof HTTPError) {
        return new Response(JSON.stringify(e.body), { status: e.code });
      } else {
        throw e;
      }
    }
  },
});
