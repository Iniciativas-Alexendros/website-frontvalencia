/**
 * OpenTelemetry-compatible client observability for FRONT Valencia.
 *
 * Implements:
 * 1. Core Web Vitals (LCP, INP, CLS, TTFB) via PerformanceObserver
 * 2. Unhandled error tracking with context
 * 3. Page view telemetry
 * 4. OTLP HTTP export (when OTLP_ENDPOINT is configured)
 *
 * Lightweight — no heavy OTel SDK on client. Sends beacons to collector.
 */

interface TelemetrySpan {
  name: string
  traceId: string
  spanId: string
  parentSpanId?: string
  startTime: number
  endTime?: number
  attributes: Record<string, string | number | boolean>
  status?: { code: number; message?: string }
  kind: 'INTERNAL' | 'CLIENT' | 'SERVER'
}

interface Metric {
  name: string
  value: number
  unit: string
  attributes: Record<string, string | number | boolean>
  timestamp: number
}

interface ErrorEvent {
  message: string
  source?: string
  lineno?: number
  colno?: number
  stack?: string
  url: string
  timestamp: number
  userAgent: string
}

const OTLP_ENDPOINT = import.meta.env.PUBLIC_OTLP_ENDPOINT || ''
const SERVICE_NAME = 'frontvalencia-web'
const SERVICE_VERSION = import.meta.env.PUBLIC_APP_VERSION || '1.0.0'

// ─── Utilities ───────────────────────────────────────────────────────────────

function generateId(bytes: number): string {
  const arr = new Uint8Array(bytes)
  crypto.getRandomValues(arr)
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('')
}

function traceId(): string {
  return generateId(16)
}

function spanId(): string {
  return generateId(8)
}

function now(): number {
  return performance.timeOrigin + performance.now()
}

// ─── OTLP Export ─────────────────────────────────────────────────────────────

async function sendOTLP(spans: TelemetrySpan[], metrics: Metric[], errors: ErrorEvent[]): Promise<void> {
  if (!OTLP_ENDPOINT) return

  const resource = {
    attributes: [
      { key: 'service.name', value: { stringValue: SERVICE_NAME } },
      { key: 'service.version', value: { stringValue: SERVICE_VERSION } },
      {
        key: 'deployment.environment',
        value: { stringValue: import.meta.env.MODE || 'production' },
      },
      { key: 'url.path', value: { stringValue: location.pathname } },
      {
        key: 'user_agent.original',
        value: { stringValue: navigator.userAgent },
      },
    ],
  }

  // OTLP Traces
  if (spans.length > 0) {
    const tracesPayload = {
      resourceSpans: [
        {
          resource,
          scopeSpans: [
            {
              scope: { name: SERVICE_NAME, version: SERVICE_VERSION },
              spans: spans.map((s) => ({
                traceId: s.traceId,
                spanId: s.spanId,
                parentSpanId: s.parentSpanId,
                name: s.name,
                kind: s.kind === 'CLIENT' ? 3 : s.kind === 'SERVER' ? 2 : 1,
                startTimeUnixNano: String(Math.floor(s.startTime * 1e6)),
                endTimeUnixNano: s.endTime ? String(Math.floor(s.endTime * 1e6)) : undefined,
                attributes: Object.entries(s.attributes).map(([key, value]) => ({
                  key,
                  value:
                    typeof value === 'string'
                      ? { stringValue: value }
                      : typeof value === 'number'
                        ? { intValue: String(value) }
                        : { boolValue: value },
                })),
                status: s.status || { code: 0 },
              })),
            },
          ],
        },
      ],
    }

    navigator.sendBeacon(`${OTLP_ENDPOINT}/v1/traces`, JSON.stringify(tracesPayload))
  }

  // OTLP Metrics
  if (metrics.length > 0) {
    const metricsPayload = {
      resourceMetrics: [
        {
          resource,
          scopeMetrics: [
            {
              scope: { name: SERVICE_NAME, version: SERVICE_VERSION },
              metrics: metrics.map((m) => ({
                name: m.name,
                unit: m.unit,
                gauge: {
                  dataPoints: [
                    {
                      asDouble: m.value,
                      timeUnixNano: String(Math.floor(m.timestamp * 1e6)),
                      attributes: Object.entries(m.attributes).map(([key, value]) => ({
                        key,
                        value:
                          typeof value === 'string'
                            ? { stringValue: value }
                            : typeof value === 'number'
                              ? { intValue: String(value) }
                              : { boolValue: value },
                      })),
                    },
                  ],
                },
              })),
            },
          ],
        },
      ],
    }

    navigator.sendBeacon(`${OTLP_ENDPOINT}/v1/metrics`, JSON.stringify(metricsPayload))
  }

  // Errors as log records via OTLP
  if (errors.length > 0) {
    const logsPayload = {
      resourceLogs: [
        {
          resource,
          scopeLogs: [
            {
              scope: { name: SERVICE_NAME, version: SERVICE_VERSION },
              logRecords: errors.map((e) => ({
                timeUnixNano: String(Math.floor(e.timestamp * 1e6)),
                severityNumber: 17, // ERROR
                severityText: 'ERROR',
                body: { stringValue: e.message },
                attributes: [
                  {
                    key: 'error.source',
                    value: { stringValue: e.source || '' },
                  },
                  {
                    key: 'error.lineno',
                    value: { intValue: String(e.lineno || 0) },
                  },
                  {
                    key: 'error.colno',
                    value: { intValue: String(e.colno || 0) },
                  },
                  { key: 'error.stack', value: { stringValue: e.stack || '' } },
                  { key: 'url.path', value: { stringValue: e.url } },
                ],
              })),
            },
          ],
        },
      ],
    }

    navigator.sendBeacon(`${OTLP_ENDPOINT}/v1/logs`, JSON.stringify(logsPayload))
  }
}

// ─── Core Web Vitals ─────────────────────────────────────────────────────────

function observeWebVitals(metrics: Metric[]): void {
  // LCP
  new PerformanceObserver((list) => {
    const entries = list.getEntries()
    if (entries.length > 0) {
      const last = entries[entries.length - 1] as any
      metrics.push({
        name: 'web_vitals.lcp',
        value: last.startTime || last.renderTime || 0,
        unit: 'ms',
        attributes: { 'web_vitals.name': 'LCP' },
        timestamp: now(),
      })
    }
  }).observe({ type: 'largest-contentful-paint', buffered: true })

  // CLS
  let clsValue = 0
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries() as any[]) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
      }
    }
    metrics.push({
      name: 'web_vitals.cls',
      value: clsValue,
      unit: 'score',
      attributes: { 'web_vitals.name': 'CLS' },
      timestamp: now(),
    })
  }).observe({ type: 'layout-shift', buffered: true })

  // INP (Interaction to Next Paint)
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries() as any[]) {
      metrics.push({
        name: 'web_vitals.inp',
        value: entry.duration || 0,
        unit: 'ms',
        attributes: {
          'web_vitals.name': 'INP',
          'event.type': entry.name,
        },
        timestamp: now(),
      })
    }
  }).observe({ type: 'event', buffered: true })

  // TTFB
  new PerformanceObserver((list) => {
    const [entry] = list.getEntries() as any[]
    if (entry) {
      metrics.push({
        name: 'web_vitals.ttfb',
        value: entry.responseStart - entry.startTime,
        unit: 'ms',
        attributes: { 'web_vitals.name': 'TTFB' },
        timestamp: now(),
      })
    }
  }).observe({ type: 'navigation', buffered: true })
}

// ─── Error Tracking ──────────────────────────────────────────────────────────

function observeErrors(errors: ErrorEvent[]): void {
  window.addEventListener('error', (event) => {
    errors.push({
      message: event.message,
      source: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack || '',
      url: location.href,
      timestamp: now(),
      userAgent: navigator.userAgent,
    })
  })

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason
    errors.push({
      message: reason instanceof Error ? reason.message : String(reason),
      stack: reason instanceof Error ? reason.stack || '' : '',
      url: location.href,
      timestamp: now(),
      userAgent: navigator.userAgent,
    })
  })
}

// ─── Page View Span ──────────────────────────────────────────────────────────

function createPageViewSpan(spans: TelemetrySpan[]): string {
  const id = spanId()
  const tid = traceId()
  spans.push({
    name: `page.view ${location.pathname}`,
    traceId: tid,
    spanId: id,
    startTime: now(),
    attributes: {
      'page.url': location.href,
      'page.path': location.pathname,
      'page.title': document.title,
    },
    kind: 'CLIENT',
  })
  return id
}

// ─── Flush on page hide ──────────────────────────────────────────────────────

function flushOnHide(spans: TelemetrySpan[], metrics: Metric[], errors: ErrorEvent[]): void {
  const flush = () => {
    // End page view span
    for (const span of spans) {
      if (!span.endTime) {
        span.endTime = now()
      }
    }
    sendOTLP(spans, metrics, errors)
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flush()
    }
  })

  window.addEventListener('pagehide', flush)
}

// ─── Init ────────────────────────────────────────────────────────────────────

export function initTelemetry(): void {
  const spans: TelemetrySpan[] = []
  const metrics: Metric[] = []
  const errors: ErrorEvent[] = []

  createPageViewSpan(spans)
  observeWebVitals(metrics)
  observeErrors(errors)
  flushOnHide(spans, metrics, errors)
}

// Auto-init
if (typeof window !== 'undefined') {
  initTelemetry()
}
