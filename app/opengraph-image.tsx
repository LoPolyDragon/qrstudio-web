import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'QR Studio — Free QR Code Generator';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom, #000, #111)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 'bold', marginBottom: 20 }}>QR Studio</div>
        <div style={{ fontSize: 40, color: '#999' }}>Free QR Code Generator</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
