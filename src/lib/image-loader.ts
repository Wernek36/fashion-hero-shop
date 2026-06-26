// Mirrors basePath from next.config.ts. NEXT_PUBLIC_ vars are inlined at
// build time, so this works in the browser for the static export.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src }: { src: string }) {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return `${basePath}${src}`;
}
