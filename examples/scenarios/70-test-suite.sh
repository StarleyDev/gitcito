# shellcheck shell=bash disable=SC2154
# 70. test-suite — a small TypeScript project with a vitest suite, one test
# failing at a known line.
#
# For the Tests tab of the Problems dock. The shot feeds the tab a report that
# matches these files, so clicking the failure opens src/cache.test.ts at the
# assertion that failed (line 27) rather than at an empty editor.
#
# Verify:
#   • src/cache.test.ts line 27 is `expect(cache.size).toBe(1)`.
R="$ROOT/test-suite"
new_repo "$R"

mkdir -p "$R/src"
cat > "$R/package.json" <<'JSON'
{
  "name": "catalog",
  "private": true,
  "type": "module",
  "scripts": { "test": "vitest run" },
  "devDependencies": { "vitest": "^3.2.0" }
}
JSON

cat > "$R/src/cache.ts" <<'TS'
/** A small least-recently-used cache for the catalog index. */
export class Cache<V> {
  private items = new Map<string, V>()
  constructor(private readonly limit = 100) {}

  get size(): number {
    return this.items.size
  }

  get(key: string): V | undefined {
    const value = this.items.get(key)
    if (value === undefined) return undefined
    this.items.delete(key)
    this.items.set(key, value)
    return value
  }

  set(key: string, value: V): void {
    this.items.set(key, value)
    if (this.items.size > this.limit) this.items.delete(this.items.keys().next().value as string)
  }
}
TS

cat > "$R/src/cache.test.ts" <<'TS'
import { describe, expect, it } from 'vitest'
import { Cache } from './cache'

describe('cache', () => {
  it('evicts the oldest entry', () => {
    const cache = new Cache<number>(2)
    cache.set('a', 1)
    cache.set('b', 2)
    cache.set('c', 3)
    expect(cache.get('a')).toBeUndefined()
  })

  it('survives a restart', () => {
    const cache = new Cache<number>()
    cache.set('index', 1)
    expect(cache.get('index')).toBe(1)
  })

  it('keeps the index between requests', () => {
    const cache = new Cache<string>()
    const request = (path: string): void => {
      cache.set('index', path)
      cache.set(`page:${path}`, path)
    }
    request('/')
    request('/about')
    expect(cache.size).toBe(1)
  })
})
TS

git -C "$R" add -A && git -C "$R" commit -qm "catalog: cache with a test suite"

summary "test-suite" "a vitest suite: src/cache.test.ts fails at line 27 — for the Tests tab of the Problems dock"
