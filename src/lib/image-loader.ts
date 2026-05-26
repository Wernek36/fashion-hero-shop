export default function imageLoader({ src }: { src: string }) {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return `/fashion-hero-shop${src}`;
}
