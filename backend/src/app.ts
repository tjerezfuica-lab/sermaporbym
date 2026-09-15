import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import authRoutes   from './routes/auth.routes';
import publicRoutes from './routes/public.routes';
import adminRoutes  from './routes/admin.routes';

const app  = express();
const PORT = process.env.PORT || 3004;

const allowed = [
  ...(process.env.FRONTEND_URL || 'http://localhost:3003').split(','),
  ...(process.env.ADMIN_URL    || 'http://localhost:5177').split(','),
];

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) cb(null, true);
    else cb(new Error(`CORS: origen no permitido: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// Servir uploads estáticamente
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth',   authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin',  adminRoutes);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`SERMAPOR API corriendo en puerto ${PORT}`);
});
