"use client";

import React, { useState, useEffect } from 'react';

export default function ColorPaletteGenerator() {
  const [palettes, setPalettes] = useState([]);

  // Generate a random hex color
  const generateColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');

  // Initialize palettes
  useEffect(() => {
    const initialPalettes = Array(3).fill(null).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      colors: Array(5).fill(null).map(generateColor),
      isSaved: false
    }));
    setPalettes(initialPalettes);
  }, []);

  // Copy color code
  const copyColor = (color) => {
    navigator.clipboard.writeText(color);
    alert('Color code copied!');
  };

  // Toggle save palette
  const toggleSave = (id) => {
    setPalettes(palettes.map(p => 
      p.id === id ? {...p, isSaved: !p.isSaved} : p
    ));
  };

  // Generate more palettes
  const generateMore = () => {
    const saved = palettes.filter(p => p.isSaved);
    const newPalettes = Array(3 - saved.length).fill(null).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      colors: Array(5).fill(null).map(generateColor),
      isSaved: false
    }));
    setPalettes([...saved, ...newPalettes]);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Color Palette Generator</h1>
      
      <div className="space-y-4">
        {palettes.map((palette) => (
          <div key={palette.id} className="bg-white p-4 rounded shadow">
            <div className="flex mb-2">
              {palette.colors.map((color, i) => (
                <div 
                  key={i}
                  onClick={() => copyColor(color)}
                  className="flex-1 h-20 cursor-pointer relative group"
                  style={{ backgroundColor: color }}
                >
                  <span className="absolute bottom-0 left-0 right-0 text-center bg-black/50 text-white 
                                 text-xs py-1 opacity-0 group-hover:opacity-100">
                    {color}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => toggleSave(palette.id)}
              className={`${palette.isSaved ? 'bg-red-500' : 'bg-green-500'} 
                         text-white px-4 py-2 rounded`}
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