export const apiBase = "/api";
async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json() as Promise<T>;
}
export async function apiGet<T>(path: string){ return handle<T>(await fetch(`${apiBase}${path}`, { cache:"no-store" })); }
export async function apiPost<T>(path: string, body?: unknown){
  return handle<T>(await fetch(`${apiBase}${path}`, { method:"POST", headers:{ "Content-Type":"application/json" }, body: body ? JSON.stringify(body) : undefined }));
}
