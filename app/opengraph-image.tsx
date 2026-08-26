import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Cabinet powered on: the dark theme is the signature look, so the share card uses it.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px',
          background: 'linear-gradient(150deg, #0a0a12 0%, #05050f 45%, #12042a 100%)',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(to right, rgba(0,255,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,255,0.09) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Accent rail */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '16px',
            display: 'flex',
            background: 'linear-gradient(to bottom, #00ffff, #ff00ff, #ffff00)',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              color: '#00ff00',
              letterSpacing: '0.24em',
              marginBottom: 28,
            }}
          >
            INSERT COIN — PLAYER ONE READY
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 92,
              fontWeight: 700,
              color: '#e8e8f0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            LENY PASCAL
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 52,
              fontWeight: 700,
              color: '#00ffff',
              marginTop: 8,
              letterSpacing: '0.02em',
            }}
          >
            SOFTWARE ENGINEER
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 30,
              color: '#9a9ab0',
              marginTop: 32,
              maxWidth: 900,
            }}
          >
            Secure, scalable web applications and distributed systems.
          </div>

          <div style={{ display: 'flex', gap: '14px', marginTop: 44 }}>
            {['FULL-STACK', '.NET', 'WEB3', 'REACT'].map((tag) => (
              <div
                key={tag}
                style={{
                  display: 'flex',
                  fontSize: 24,
                  color: '#ffff00',
                  border: '3px solid #ffff00',
                  padding: '10px 22px',
                  letterSpacing: '0.1em',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
