import React from 'react';
import ColorPaletteGenerator from '../components/ColorPaletteGenerator';

export default function Home() {
  return (
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <ColorPaletteGenerator />
    </div>
  );
}