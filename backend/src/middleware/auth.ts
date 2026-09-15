import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  adminId?: string;
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) { res.status(401).json({ success: false, error: 'No autorizado.' }); return; }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    req.adminId = payload.id;
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Token inválido.' });
  }
}
