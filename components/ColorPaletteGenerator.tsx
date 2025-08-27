"use client";

import React, { useState, useEffect } from 'react';

export default function ColorPaletteGenerator() {
  const [palettes, setPalettes] = useState([]);

  // Generate a random color
  const generateColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };

  // Generate initial palettes
  useEffect(() => {
    const initial = Array(3).fill(null).map(() => ({
      id: Math.random().toString(36).slice(2, 9),
      colors: Array(5).fill(null).map(generateColor),
      isSaved: false
    }));
    setPalettes(initial);
  }, []);

  // Copy color code
  const copyColor = (color) => {
    navigator.clipboard.writeText(color);
    alert('Copied to clipboard!');
  };

  // Save/unsave palette
  const toggleSave = (id) => {
    setPalettes(current => 
      current.map(p => p.id === id ? {...p, isSaved: !p.isSaved} : p)
    );
  };

  // Generate new palettes
  const generateMore = () => {
    const saved = palettes.filter(p => p.isSaved);
    const new_palettes = Array(3 - saved.length).fill(null).map(() => ({
      id: Math.random().toString(36).slice(2, 9),
      colors: Array(5).fill(null).map(generateColor),
      isSaved: false
    }));
    setPalettes([...saved, ...new_palettes]);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Color Palette Generator</h1>
      
      <div className="space-y-6">
        {palettes.map((palette) => (
          <div key={palette.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex gap-1 mb-4">
              {palette.colors.map((color, index) => (
                <div 
                  key={index}
                  onClick={() => copyColor(color)}
                  className="flex-1 h-24 cursor-pointer relative group"
                  style={{ backgroundColor: color }}
                >
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white 
                              text-center py-1 opacity-0 group-hover:opacity-100">
                    {color.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => toggleSave(palette.id)}
              className={`
                ${palette.isSaved ? 'bg-red-500' : 'bg-green-500'}
                text-white px-4 py-2 rounded-md hover:opacity-90
              `}
            >
              {palette.isSaved ? 'Unsave' : 'Save'}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={generateMore}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md 
                 hover:bg-blue-600 transition-colors"
      >
        Generate More
      </button>
    </div>
  );
}