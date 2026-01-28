// cinewave-agent-api client
// Usage: import { apiPost } from "@/utils/api";

import toast from "react-hot-toast";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_AGENT_API_URL ?? "http://127.0.0.1:9000";

export async function apiPost<T = unknown, B = unknown>(
  endpoint: string,
  body: B,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    body: JSON.stringify(body),
    ...options,
  });
  if (!res.ok) {
    let errorMsg = `API error: ${res.status}`;
    try {
      const errorData = await res.json();
      errorMsg = errorData?.detail ?? errorData?.message ?? errorMsg;
    } catch {}
    toast.error(errorMsg);
    throw new Error(errorMsg);
  }
  return res.json();
}
