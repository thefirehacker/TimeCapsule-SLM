import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://timecapsuleslm.com/";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/auth/error",
          "/auth/reset-password",
          "/auth/verify",
          "/_next/",
          "/admin/",
        ],
      },
    ],
    sitemap: `${baseUrl}sitemap.xml`,
  };
}
