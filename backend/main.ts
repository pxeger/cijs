import { type Server } from "bun";
import {} from "./db"; // run migrations

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
    return await handlerModule.default(route.params ?? {}, request, server);
  },
});
