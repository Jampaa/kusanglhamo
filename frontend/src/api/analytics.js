import { apiRequest } from "./client";

export async function getPortfolioViews() {
  const data = await apiRequest("/api/portfolio/views");
  return Number(data?.count || 0);
}

export async function incrementPortfolioViews() {
  const data = await apiRequest("/api/portfolio/views/increment", {
    method: "POST",
  });
  return Number(data?.count || 0);
}
