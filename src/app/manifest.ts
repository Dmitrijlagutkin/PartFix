import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: "Recreating impossible-to-find plastic replacement parts from photos.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [{ src: "/icon", sizes: "32x32", type: "image/png" }],
  };
}
