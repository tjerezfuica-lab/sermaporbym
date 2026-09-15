const BASE = 'http://localhost:3004/api';

function getToken() { return localStorage.getItem('smp_token') ?? ''; }

async function req(method: string, path: string, body?: unknown) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

export const api = {
  login:          (u: string, p: string) => req('POST', '/auth/login', { username: u, password: p }),
  me:             ()                      => req('GET',  '/auth/me'),
  getSite:        ()                      => req('GET',  '/public/site'),
  getHero:        ()                      => req('GET',  '/admin/hero'),
  saveHero:       (id: string, d: unknown)=> req('PUT',  `/admin/hero/${id}`, d),
  createHero:     (d: unknown)            => req('POST', '/admin/hero', d),
  deleteHero:     (id: string)            => req('DELETE',`/admin/hero/${id}`),
  getSection:     (key: string)           => req('GET',  '/admin/sections').then((r:  { success: boolean; data: { key: string; title: string; content: string }[] }) => ({ success: r.success, data: r.data?.find((s: { key: string }) => s.key === key) })),
  getSections:    ()                      => req('GET',  '/admin/sections'),
  saveSection:    (key: string, d: unknown)=>req('PUT',  `/admin/sections/${key}`, d),
  getServices:    ()                      => req('GET',  '/admin/services'),
  saveService:    (id: string, d: unknown)=> req('PUT',  `/admin/services/${id}`, d),
  createService:  (d: unknown)            => req('POST', '/admin/services', d),
  deleteService:  (id: string)            => req('DELETE',`/admin/services/${id}`),
  getClients:     ()                      => req('GET',  '/admin/clients'),
  saveClient:     (id: string, d: unknown)=> req('PUT',  `/admin/clients/${id}`, d),
  createClient:   (d: unknown)            => req('POST', '/admin/clients', d),
  deleteClient:   (id: string)            => req('DELETE',`/admin/clients/${id}`),
  getMessages:    ()                      => req('GET',  '/admin/messages'),
  markRead:       (id: string)            => req('PUT',  `/admin/messages/${id}/read`),
  deleteMessage:  (id: string)            => req('DELETE',`/admin/messages/${id}`),
  getConfig:      ()                      => req('GET',  '/admin/config'),
  saveConfig:     (d: unknown)            => req('PUT',  '/admin/config', d),
  uploadFile: async (file: File) => {
    const fd = new FormData(); fd.append('file', file);
    const res = await fetch(`${BASE}/admin/upload`, { method: 'POST', headers: { Authorization: `Bearer ${getToken()}` }, body: fd });
    return res.json();
  },
};
