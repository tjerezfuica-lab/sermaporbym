import { Router, Response } from 'express';
import { prisma } from '../utils/prisma';
import { requireAdmin, AuthRequest } from '../middleware/auth';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();
router.use(requireAdmin);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ext  = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    cb(null, name);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// ── Upload imagen ─────────────────────────────────────────────────────────────
router.post('/upload', upload.single('file'), (req: AuthRequest, res: Response) => {
  if (!req.file) { res.status(400).json({ success: false, error: 'No se recibió archivo.' }); return; }
  res.json({ success: true, url: `/uploads/${req.file.filename}` });
});

// ── Hero slides ───────────────────────────────────────────────────────────────
router.get('/hero', async (_req, res: Response) => {
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: 'asc' } });
  res.json({ success: true, data: slides });
});
router.post('/hero', async (req: AuthRequest, res: Response) => {
  const slide = await prisma.heroSlide.create({ data: req.body });
  res.json({ success: true, data: slide });
});
router.put('/hero/:id', async (req: AuthRequest, res: Response) => {
  const id = String(req.params.id);
  const slide = await prisma.heroSlide.update({ where: { id }, data: req.body });
  res.json({ success: true, data: slide });
});
router.delete('/hero/:id', async (req: AuthRequest, res: Response) => {
  const id = String(req.params.id);
  await prisma.heroSlide.delete({ where: { id } });
  res.json({ success: true });
});

// ── Secciones ─────────────────────────────────────────────────────────────────
router.get('/sections', async (_req, res: Response) => {
  const sections = await prisma.section.findMany();
  res.json({ success: true, data: sections });
});
router.put('/sections/:key', async (req: AuthRequest, res: Response) => {
  const key = String(req.params.key);
  const section = await prisma.section.upsert({
    where:  { key },
    update: req.body,
    create: { key, ...req.body },
  });
  res.json({ success: true, data: section });
});

// ── Servicios ─────────────────────────────────────────────────────────────────
router.get('/services', async (_req, res: Response) => {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  res.json({ success: true, data: services });
});
router.post('/services', async (req: AuthRequest, res: Response) => {
  const service = await prisma.service.create({ data: req.body });
  res.json({ success: true, data: service });
});
router.put('/services/:id', async (req: AuthRequest, res: Response) => {
  const id = String(req.params.id);
  const service = await prisma.service.update({ where: { id }, data: req.body });
  res.json({ success: true, data: service });
});
router.delete('/services/:id', async (req: AuthRequest, res: Response) => {
  const id = String(req.params.id);
  await prisma.service.delete({ where: { id } });
  res.json({ success: true });
});

// ── Clientes ──────────────────────────────────────────────────────────────────
router.get('/clients', async (_req, res: Response) => {
  const clients = await prisma.client.findMany({ orderBy: { order: 'asc' } });
  res.json({ success: true, data: clients });
});
router.post('/clients', async (req: AuthRequest, res: Response) => {
  const client = await prisma.client.create({ data: req.body });
  res.json({ success: true, data: client });
});
router.put('/clients/:id', async (req: AuthRequest, res: Response) => {
  const id = String(req.params.id);
  const client = await prisma.client.update({ where: { id }, data: req.body });
  res.json({ success: true, data: client });
});
router.delete('/clients/:id', async (req: AuthRequest, res: Response) => {
  const id = String(req.params.id);
  await prisma.client.delete({ where: { id } });
  res.json({ success: true });
});

// ── Mensajes de contacto ──────────────────────────────────────────────────────
router.get('/messages', async (_req, res: Response) => {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  res.json({ success: true, data: messages });
});
router.put('/messages/:id/read', async (req: AuthRequest, res: Response) => {
  const id = String(req.params.id);
  await prisma.contactMessage.update({ where: { id }, data: { read: true } });
  res.json({ success: true });
});
router.delete('/messages/:id', async (req: AuthRequest, res: Response) => {
  const id = String(req.params.id);
  await prisma.contactMessage.delete({ where: { id } });
  res.json({ success: true });
});

// ── Config del sitio ──────────────────────────────────────────────────────────
router.get('/config', async (_req, res: Response) => {
  const config = await prisma.siteConfig.findMany();
  res.json({ success: true, data: config });
});
router.put('/config', async (req: AuthRequest, res: Response) => {
  const entries = Object.entries(req.body as Record<string, string>);
  await Promise.all(entries.map(([key, value]) =>
    prisma.siteConfig.upsert({ where: { key }, update: { value }, create: { key, value } })
  ));
  res.json({ success: true });
});

export default router;
