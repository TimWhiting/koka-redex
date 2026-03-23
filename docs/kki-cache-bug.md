# KKI Cache Invalidation Bug — Timestamp Granularity

## Summary

When a `.kk` source file is rewritten (not appended/edited in-place) within the same second as the previous build, the `.kki` interface file has the same timestamp as the source. Koka's rebuild check compares timestamps and concludes the `.kki` is up to date, so it uses the stale interface — causing parse errors.

## Reproduction

```bash
# Build successfully
koka -e mymodule.kk
# Rewrite mymodule.kk within the same second (e.g., via a tool/script)
# Rebuild — uses stale .kki, fails:
koka -e mymodule.kk
# Error: .koka/.../mymodule.kki(N,M): parse error
```

## Workaround

`touch mymodule.kk` advances the timestamp, then rebuild works.

Or `koka -e --rebuild mymodule.kk` to force rebuild.

## Root Cause

The timestamp comparison uses second-level granularity. If the source is rewritten within the same second as the `.kki` was generated, the build system considers them equal and skips recompilation.

## Suggested Fix

Use sub-second timestamps (nanoseconds) for the comparison, or use content hashing instead of timestamps, or treat equal timestamps as "needs rebuild" (conservative).

## Environment

- Koka v3.2.3, macOS Darwin 25.3.0
- Compiler source: `~/koka-dev`
