import { BunRuntime } from "@effect/platform-bun"
import { Effect } from "effect"

const main = Effect.logInfo("Hello Effect Coding Challenge")

BunRuntime.runMain(main)
