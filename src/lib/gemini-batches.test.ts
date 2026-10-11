import {expect,it} from "vitest";
import { normalizeState } from "./gemini-batches";
it.each(["JOB_STATE_SUCCEEDED","BATCH_STATE_SUCCEEDED"])("normalizes terminal %s",s=>expect(normalizeState(s)).toBe("SUCCEEDED"));
