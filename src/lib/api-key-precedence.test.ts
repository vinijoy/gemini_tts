import { afterEach, expect, it, vi } from "vitest";
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { apiKey } from "./gemini-client";

vi.mock("node:fs", async (original) => ({
    ...await original<typeof import("node:fs")>(),
    readFileSync: () => 'GEMINI_API_KEY="file-fixture"',
}));
afterEach(() => vi.unstubAllEnvs());

it("uses the exported shell key even when .env.local contains another key", () => {
    vi.stubEnv("GEMINI_API_KEY", "shell-fixture");
    expect(apiKey()).toBe("shell-fixture");
});

it("keeps local-file fallback when no shell key is set", () => {
    vi.stubEnv("GEMINI_API_KEY", undefined);
    expect(apiKey()).toBe("file-fixture");
});

it("catalog CLI sends the shell key instead of the local-file key", () => {
    const root = mkdtempSync(path.join(tmpdir(), "tts-key-test-"));
    try {
        mkdirSync(path.join(root, "scripts"));
        mkdirSync(path.join(root, "src/lib"), { recursive: true });
        copyFileSync("scripts/generate-voice-catalog.mjs", path.join(root, "scripts/catalog.mjs"));
        writeFileSync(path.join(root, ".env.local"), "GEMINI_API_KEY=file-fixture\n");
        writeFileSync(path.join(root, "src/lib/tts-contract.ts"), "export const VOICE_NAMES = [];\n");
        writeFileSync(path.join(root, "scripts/preload.mjs"), `
globalThis.fetch = async (_url, init) => {
  console.log("shell-key-used=" + (init.headers["x-goog-api-key"] === "shell-fixture"));
  return new Response(JSON.stringify({ voices: [] }), { status: 200 });
};
`);
        const result = spawnSync(process.execPath, ["--import", "./scripts/preload.mjs", "./scripts/catalog.mjs"], {
            cwd: root, env: { ...process.env, GEMINI_API_KEY: "shell-fixture" }, encoding: "utf8",
        });
        expect(result.status).toBe(0);
        expect(result.stdout).toContain("shell-key-used=true");
    } finally {
        rmSync(root, { recursive: true, force: true });
    }
});
