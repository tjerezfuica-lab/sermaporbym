import { Router, Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { z } from 'zod';

const router = Router();

// GET todo el contenido del sitio en un solo call
router.get('/site', async (_req: Request, res: Response) => {
  const [hero, sections, services, clients, config] = await Promise.all([
    prisma.heroSlide.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    prisma.section.findMany(),
    prisma.service.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    prisma.client.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    prisma.siteConfig.findMany(),
  ]);
  const cfg = Object.fromEntries(config.map(c => [c.key, c.value]));
  res.json({ success: true, data: { hero, sections, services, clients, config: cfg } });
});

// POST mensaje de contacto
const contactSchema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  phone:   z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10),
});

router.post('/contact', async (req: Request, res: Response) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ success: false, error: 'Datos inválidos.' }); return; }
  await prisma.contactMessage.create({ data: parsed.data });
  res.json({ success: true, data: { message: 'Mensaje enviado correctamente.' } });
});

export default router;
