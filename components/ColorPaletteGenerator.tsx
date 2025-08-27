"use client";

import React, { useState, useEffect } from 'react';

export default function ColorPaletteGenerator() {
  const [palettes, setPalettes] = useState<Array<{
    id: string;
    colors: string[];
    isSaved: boolean;
  }>>([]);

  const generateColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };

  const generatePalette = () => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      colors: Array(5).fill(null).map(() => generateColor()),
      isSaved: false
    };
  };

  const generateNewPalettes = (existingPalettes = []) => {
    const newPalettes = [...existingPalettes];
    while (newPalettes.length < 3) {
      newPalettes.push(generatePalette());
    }
    return newPalettes;
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    alert(`Copied ${hex} to clipboard!`);
  };

  const toggleSave = (id: string) => {
    setPalettes(palettes.map(palette => 
      palette.id === id ? { ...palette, isSaved: !palette.isSaved } : palette
    ));
  };

  const generateMore = () => {
    const savedPalettes = palettes.filter(p => p.isSaved);
    setPalettes(generateNewPalettes(savedPalettes));
  };

  useEffect(() => {
    setPalettes(generateNewPalettes());
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Color Palette Generator</h1>
        
        <div className="space-y-6">
          {palettes.map(palette => (
            <div 
              key={palette.id} 
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex mb-3">
                {palette.colors.map((color, index) => (
                  <div 
                    key={index} 
                    className="flex-1 aspect-square relative group"
                    style={{ backgroundColor: color }}
                  >
                    <button
                      onClick={() => copyToClipboard(color)}
                      className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white 
                               py-1 opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                    >
                      {color.toUpperCase()}
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => toggleSave(palette.id)}
                className={`px-4 py-2 rounded ${
                  palette.isSaved 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                } text-white transition-colors`}
              >
                {palette.isSaved ? 'Unsave' : 'Save'}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={generateMore}
          className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
                   transition-colors font-semibold"
        >
          Generate More
        </button>
      </div>
    </div>
  );
}