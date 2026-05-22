/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Emit a fully static site into ./out on `next build`. GitHub Pages serves
  // static files only — no Node runtime, no API routes, no Image Optimization.
  output: "export",

  // Required for static export: the default `next/image` loader needs a server,
  // so we tell it to leave URLs alone. (We don't use <Image> right now, but
  // this prevents future surprises.)
  images: { unoptimized: true },

  // /about → /about/index.html. Helps Pages resolve sub-paths cleanly even
  // though this site is single-page.
  trailingSlash: true,
};

export default nextConfig;
