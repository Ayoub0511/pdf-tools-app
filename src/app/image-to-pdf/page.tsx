'use client'

import React, { useState } from 'react';

export default function ImageToPdfPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('Aucun fichier choisi');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('Aucun fichier choisi');
    }
  };

  const handleButtonClick = () => {
    // Had l-check houwa l-mochkil!
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      alert("3afak khtar wahed l'image!");
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/image-to-pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        alert('L-fichier PDF tsifet!');
      } else {
        const errorData = await response.json();
        alert(`Mochkil: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Mochkil f-conversion:', error);
      alert('Mochkil f-conversion. 3awd jreb men ba3d.');
    }
  };

  return (
    <div>
      <h1>Convert Image to PDF</h1>
      <input 
        type="file" 
        id="fileInput" 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />
      <button 
        onClick={handleButtonClick}
      >
        Choisir un fichier
      </button>
      <span>{fileName}</span>
      <button onClick={handleConvert}>Convert</button>
    </div>
  );
}