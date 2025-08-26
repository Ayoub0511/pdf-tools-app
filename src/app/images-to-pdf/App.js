import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImagesToPdfPage from './ImagesToPdfPage'; // Hna ghadi t-importi l-component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/images-to-pdf" element={<ImagesToPdfPage />} />
        {/* Zid l-routes li bghiti */}
      </Routes>
    </Router>
  );
}

export default App;