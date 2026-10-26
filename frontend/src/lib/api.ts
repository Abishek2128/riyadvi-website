const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type ApiResult = {
  success: boolean;
  message: string;
  errors?: { field: string; message: string }[];
};

const NETWORK_ERROR: ApiResult = {
  success: false,
  message: "Could not reach the server. Please try again.",
};

export async function postForm(
  path: string,
  data: Record<string, unknown>
): Promise<ApiResult> {
  try {
    const res = await fetch(`${API}/api${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return NETWORK_ERROR;
  }
}

export async function postMultipart(path: string, body: FormData): Promise<ApiResult> {
  try {
    const res = await fetch(`${API}/api${path}`, { method: "POST", body });
    return await res.json();
  } catch {
    return NETWORK_ERROR;
  }
}