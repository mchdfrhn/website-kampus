import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const size = {
  width: 1200,
  height: 630,
};

function clampText(value: string | null, fallback: string, maxLength: number) {
  const text = (value || fallback).replace(/\s+/g, ' ').trim();
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}...` : text;
}

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = clampText(searchParams.get('title'), 'STTPU Jakarta', 96);
  const description = clampText(
    searchParams.get('description'),
    'Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta',
    150
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#f8fafc',
          color: '#0f172a',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 38%, #f0fdf4 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -90,
            top: -120,
            width: 440,
            height: 440,
            borderRadius: 220,
            background: '#bae6fd',
            opacity: 0.72,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -120,
            bottom: -150,
            width: 520,
            height: 520,
            borderRadius: 260,
            background: '#bbf7d0',
            opacity: 0.62,
          }}
        />
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '72px 82px 64px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              color: '#075985',
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            <div
              style={{
                width: 78,
                height: 78,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 18,
                background: '#0369a1',
                color: '#ffffff',
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              S
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>STTPU Jakarta</span>
              <span
                style={{
                  color: '#334155',
                  fontSize: 20,
                  fontWeight: 600,
                  marginTop: 6,
                }}
              >
                Sekolah Tinggi Teknologi Pekerjaan Umum
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div
              style={{
                display: 'flex',
                maxWidth: 960,
                fontSize: 68,
                lineHeight: 1.04,
                fontWeight: 900,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: 'flex',
                maxWidth: 900,
                color: '#334155',
                fontSize: 31,
                lineHeight: 1.36,
                fontWeight: 500,
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#475569',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            <span>sttpu.ac.id</span>
            <span>Pendidikan tinggi teknologi untuk infrastruktur Indonesia</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
