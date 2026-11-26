// my-agentai-app Worker: 정적 앱(assets) + 각 모듈 API.
// 접근 보호는 Cloudflare Access(Zero Trust)에서 설정합니다. 이 코드는 인증을 하지 않습니다.
import { stateSchema, defaultState, normalizeState } from "../src/apps/ucsb/planner";

interface Env { DB: D1Database; ASSETS: Fetcher }
const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

async function ucsbPlanner(request: Request, env: Env) {
  if (request.method === "GET") {
    try {
      const row = await env.DB.prepare("SELECT payload, revision FROM planners WHERE id = 'main'").first<{ payload: string; revision: number }>();
      return json({ data: row ? normalizeState(JSON.parse(row.payload)) : defaultState, revision: row?.revision ?? 0 });
    } catch { return json({ error: "저장된 데이터를 불러오지 못했습니다." }, 500); }
  }
  if (request.method === "PUT") {
    if (request.headers.get("sec-fetch-site") === "cross-site") return json({ error: "허용되지 않은 요청" }, 403);
    try {
      const raw = await request.text();
      if (raw.length > 2_000_000) return json({ error: "데이터 용량을 초과했습니다." }, 413);
      const body = JSON.parse(raw);
      const parsed = stateSchema.safeParse(body.data);
      if (!parsed.success || !Number.isInteger(body.revision) || body.revision < 0) return json({ error: "입력값을 확인하세요." }, 400);
      await env.DB.prepare("INSERT INTO planners (id, payload, revision) VALUES ('main', ?, 0) ON CONFLICT(id) DO NOTHING").bind(JSON.stringify(defaultState)).run();
      const row = await env.DB.prepare("UPDATE planners SET payload = ?, revision = ? WHERE id = 'main' AND revision = ? RETURNING revision")
        .bind(JSON.stringify(parsed.data), body.revision + 1, body.revision).first<{ revision: number }>();
      if (!row) return json({ error: "다른 창에서 변경되었습니다. 새로고침 후 다시 시도하세요." }, 409);
      return json({ revision: row.revision });
    } catch { return json({ error: "저장하지 못했습니다. 다시 시도하세요." }, 500); }
  }
  return json({ error: "허용되지 않은 메서드" }, 405);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/planner") return ucsbPlanner(request, env);
    if (pathname.startsWith("/api/")) return json({ error: "없는 주소" }, 404);
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
