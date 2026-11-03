# Health Route Implementation Plan

> 이 문서는 작성 당시의 계획·조사 기록이다. 현재 제품 범위는 [PRD](../../../PRD.md)를 따르며, 아래 계획이나 검증 상태를 현재 구현·실기 수용 완료로 해석하지 않는다.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dependency-free `GET /api/health` endpoint that reports whether the Next.js process can serve requests.

**Architecture:** A single App Router Route Handler returns a fixed JSON response through the standard Web `Response.json()` API. A colocated Vitest test calls the exported handler directly, while the exact installed Next.js documents used for the decision are preserved under `docs/nextjs/`.

**Tech Stack:** Next.js 16.2.12 App Router, TypeScript, Web Response API, Vitest 4.1.10

## Global Constraints

- The endpoint reports liveness only and must not call Gemini or inspect environment variables.
- Return status `200` with the exact JSON object `{ "status": "ok" }`.
- Do not expose version, server time, environment variables, or API-key state.
- Add no dependency, shared helper, configuration option, or explicit cache override.
- Preserve the full installed Next.js documents actually consulted as Markdown under `docs/nextjs/`, recording version 16.2.12 and original local paths.

---

### Task 1: Liveness Route Handler

**Files:**
- Create: `src/app/api/health/route.test.ts`
- Create: `src/app/api/health/route.ts`
- Create: `docs/nextjs/route-handlers.md`
- Create: `docs/nextjs/route-file-convention.md`

**Interfaces:**
- Consumes: Next.js App Router `route.ts` file convention and the Web `Response.json(data)` API.
- Produces: `GET(): Response`, served by Next.js at `GET /api/health`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/health", () => {
  it("returns the application liveness status as JSON", async () => {
    const response = GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    await expect(response.json()).resolves.toEqual({ status: "ok" });
  });
});
```

- [ ] **Step 2: Run the focused test to verify RED**

Run: `npm test -- src/app/api/health/route.test.ts`

Expected: FAIL because `./route` does not exist. The failure must be caused by the missing health Route Handler, not a test syntax or configuration error.

- [ ] **Step 3: Add the minimal Route Handler**

```ts
export function GET() {
  return Response.json({ status: "ok" });
}
```

- [ ] **Step 4: Run the focused test to verify GREEN**

Run: `npm test -- src/app/api/health/route.test.ts`

Expected: one test passes with no failures.

- [ ] **Step 5: Preserve the consulted Next.js documents**

Copy the complete contents of these installed Markdown sources without omission:

- `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md` to `docs/nextjs/route-handlers.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md` to `docs/nextjs/route-file-convention.md`

Prepend each copy with this provenance block, using the matching source path:

```md
> Next.js version: 16.2.12
> Official source bundled with the installed `next` package: `<source path>`

```

- [ ] **Step 6: Run complete verification**

Run in this order:

```bash
npm test
npm run lint
npm run build
```

Expected: every command exits with status 0; Vitest reports no failed tests, ESLint reports no errors, and the production build includes `/api/health`.

- [ ] **Step 7: Review and commit the implementation**

Run:

```bash
git diff --check
git status --short
git diff -- src/app/api/health docs/nextjs
```

Confirm that `.serena/` remains untracked and unstaged. Then commit only the four task files:

```bash
git add src/app/api/health/route.ts src/app/api/health/route.test.ts docs/nextjs/route-handlers.md docs/nextjs/route-file-convention.md
git commit -m "상태 확인 API 추가"
```
