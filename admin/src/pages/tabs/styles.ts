import type { CSSProperties } from 'react';

export const BLUE = '#244B93';
export const RED  = '#E22F13';

export const cardStyle: CSSProperties = {
  background: '#fff', borderRadius: 12, padding: '28px 32px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: 24,
};

export const h2Style: CSSProperties = {
  fontSize: 22, fontWeight: 700, color: BLUE, marginBottom: 24,
};

export const labelStyle: CSSProperties = {
  display: 'block', fontSize: 13, fontWeight: 600, color: '#555', marginBottom: 6,
};

export const inputStyle: CSSProperties = {
  width: '100%', padding: '11px 14px', border: '1.5px solid #dde3ef',
  borderRadius: 8, fontSize: 15, outline: 'none', fontFamily: 'Open Sans, sans-serif',
};

export const btnPrimary: CSSProperties = {
  padding: '11px 24px', background: BLUE, color: '#fff', border: 'none',
  borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer',
};

export const btnDanger: CSSProperties = {
  padding: '8px 16px', background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5',
  borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer',
};

export const btnSecondary: CSSProperties = {
  padding: '11px 24px', background: '#f1f5f9', color: '#334155', border: '1px solid #e2e8f0',
  borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer',
};
