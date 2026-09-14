import { Configuration, MarkdownApi } from "@/api";

const config = new Configuration({
  basePath: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

export const markdownApi = new MarkdownApi(config);