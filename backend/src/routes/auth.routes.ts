import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma';
import { requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) { res.status(400).json({ success: false, error: 'Credenciales requeridas.' }); return; }

  const admin = await prisma.adminUser.findUnique({ where: { username } });
  if (!admin) { res.status(401).json({ success: false, error: 'Credenciales incorrectas.' }); return; }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) { res.status(401).json({ success: false, error: 'Credenciales incorrectas.' }); return; }

  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
  res.json({ success: true, data: { token, username: admin.username } });
});

router.get('/me', requireAdmin, async (req: AuthRequest, res: Response) => {
  const admin = await prisma.adminUser.findUnique({ where: { id: req.adminId }, select: { id: true, username: true } });
  res.json({ success: true, data: admin });
});

export default router;
