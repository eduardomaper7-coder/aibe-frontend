import type { MetadataRoute } from "next"

const locales = ["es", "en"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  const routes = ["/", "/login", "/precios", "/contact"]

  return locales.flatMap((locale) =>
    routes.map((r) => ({
      url: `${baseUrl}/${locale}${r === "/" ? "" : r}`,
      lastModified: new Date(),
    }))
  )
}
