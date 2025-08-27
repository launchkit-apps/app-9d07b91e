"use client";

import React from 'react';

export default function ColorPaletteGenerator() {
  const [palettes, setPalettes] = React.useState([]);

  const generateColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');

  React.useEffect(() => {
    const initial = [1,2,3].map(() => ({
      id: Math.random().toString(36).slice(2,9),
      colors: [1,2,3,4,5].map(() => generateColor()),
      isSaved: false
    }));
    setPalettes(initial);
  }, []);

  const copyColor = (color) => {
    navigator.clipboard.writeText(color);
    alert('Copied!');
  };

  const toggleSave = (id) => {
    setPalettes(prev => prev.map(p => 
      p.id === id ? {...p, isSaved: !p.isSaved} : p
    ));
  };

  const generateMore = () => {
    const saved = palettes.filter(p => p.isSaved);
    const newOnes = Array(3 - saved.length).fill(null).map(() => ({
      id: Math.random().toString(36).slice(2,9),
      colors: [1,2,3,4,5].map(() => generateColor()),
      isSaved: false
    }));
    setPalettes([...saved, ...newOnes]);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Color Palette Generator</h1>
      
      <div className="space-y-4">
        {palettes.map(palette => (
          <div key={palette.id} className="bg-white p-4 rounded shadow">
            <div className="flex gap-1 mb-2">
              {palette.colors.map((color, i) => (
                <div 
                  key={i}
                  onClick={() => copyColor(color)}
                  className="flex-1 h-20 relative cursor-pointer"
                  style={{ backgroundColor: color }}
                >
                  <div className="absolute bottom-0 w-full bg-black/50 text-white text-xs p-1 text-center">
                    {color}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => toggleSave(palette.id)}
              className={`${palette.isSaved ? 'bg-red-500' : 'bg-green-500'} text-white px-4 py-2 rounded`}
            >
              {palette.isSaved ? 'Unsave' : 'Save'}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={generateMore}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
      >
        Generate More
      </button>
    </div>
  );
}