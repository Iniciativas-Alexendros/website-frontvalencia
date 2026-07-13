/**
 * Performance Budget for FRONT Valencia
 * These values are monitored by Lighthouse CI and collected in CI.
 * For local testing, use: npx lhci collect
 *
 * Targets (mobile simulated):
 * - LCP < 2.5s
 * - TBT < 200ms
 * - CLS < 0.1
 * - SI < 3.4s
 * - FCP < 1.8s
 */

export const performanceBudget = {
  lcp: 2500,
  tbt: 200,
  cls: 0.1,
  si: 3400,
  fcp: 1800,
} as const

export default function PerformanceBudget() {
  return null
}
