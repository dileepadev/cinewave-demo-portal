// cinewave-core-api client
// Usage: import { apiFetch } from "@/utils/api";

import toast from "react-hot-toast";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_CORE_API_URL ?? "http://127.0.0.1:8000";

export async function apiFetch<T = unknown>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
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

export async function apiDelete<T = unknown>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
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
