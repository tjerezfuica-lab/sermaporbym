export interface SiteData {
  hero:     { id: string; order: number; title: string; subtitle?: string; image: string }[];
  sections: { key: string; title: string; content: string; image?: string }[];
  services: { id: string; order: number; title: string; subtitle?: string; description: string; icon?: string; image?: string }[];
  clients:  { id: string; name: string; logo: string }[];
  config:   Record<string, string>;
}
