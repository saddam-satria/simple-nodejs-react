import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageError from '../pages/error';
import Homepage from '../pages/homepage';

export function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/book/:id" element={<span>Detail Book</span>} />

        <Route path="*" element={<PageError />} />
      </Routes>
    </Router>
  );
}
