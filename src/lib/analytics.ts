import posthog from "posthog-js";

const enabled = !!process.env.NEXT_PUBLIC_POSTHOG_KEY;

/**
 * Safe wrapper around posthog.capture. No-op when no PostHog key is
 * configured, so the app never logs "capture before init" warnings and
 * local/dev builds stay clean.
 */
export function track(event: string, properties?: Record<string, unknown>) {
  if (!enabled) return;
  posthog.capture(event, properties);
}
