'use client'

import React, { useState } from 'react';

// Had l-page katkhdem b-React hooks, dakchi 3lach khassna ndiro 'use client'
// f-l-awal dial l-fichier.

export default function ImageToPdfPage() {
  // Kanstkhdemou useState bach n7tafdou b-l-fichier li tkhater o smiytou
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('Aucun fichier choisi');

  // Had l-function katbdel l-file name mli l-user kaykhtar un fichier
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('Aucun fichier choisi');
    }
  };

  // Had l-function katkhdem mli l-user kaytclica 3la 'Choisir un fichier'
  const handleButtonClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  // Had l-function katsefet l-image l-l-backend باش y7ewwelha l-PDF
  const handleConvert = async () => {
    // Kangolo l-user ila nsa ma khtarch l-fichier
    if (!selectedFile) {
      alert("3afak khtar wahed l'image!");
      return;
    }

    // Kangaddu l-données bach nseftouhom l-l-backend
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      // Kansseftou l-données l-l-API route
      const response = await fetch('/api/tools/image-to-pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Kandiro download dial l-fichier mli katkon l-response ok
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
        // Kanssfou l-erreur ila kan
        const errorData = await response.json();
        alert(`Mochkil: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Mochkil f-conversion:', error);
      alert('Mochkil f-conversion. 3awd jreb men ba3d.');
    }
  };

  // Hada howa l-design dial l-page li ghadi yban l-user
  return (
    <div>
      <h1>Convert Image to PDF</h1>
      {/* Hidden input field for file selection */}
      <input 
        type="file" 
        id="fileInput" 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />
      
      {/* Button to trigger file selection */}
      <button 
        onClick={handleButtonClick}
      >
        Choisir un fichier
      </button>
      <span>{fileName}</span>
      
      {/* Button to start the conversion */}
      <button onClick={handleConvert}>Convert</button>
    </div>
  );
}