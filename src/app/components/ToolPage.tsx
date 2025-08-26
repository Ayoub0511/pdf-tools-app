import React from 'react';

interface ToolPageProps {
  title: string;
  description: string;
}

const ToolPage: React.FC<ToolPageProps> = ({ title, description }) => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{title}</h1>
      <p>{description}</p>
      <div style={{ margin: '2rem 0' }}>
        <button style={{ padding: '0.5rem 1rem' }}>
          Choisir un fichier
        </button>
        <span style={{ margin: '0 1rem' }}>Aucun fichier choisi</span>
      </div>
      <button style={{ padding: '0.5rem 2rem' }}>
        Convert
      </button>
    </div>
  );
};

export default ToolPage;