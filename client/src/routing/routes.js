import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormAddBook from '../pages/book/add';
import DetailBook from '../pages/book/detail';
import FormUpdateData from '../pages/book/edit';
import PageError from '../pages/error';
import Homepage from '../pages/homepage';

export function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/book/new" element={<FormAddBook />} />
        <Route path="/book/:id">
          <Route index element={<DetailBook />} />
          <Route path="update" element={<FormUpdateData />} />
        </Route>
        <Route path="*" element={<PageError />} />
      </Routes>
    </Router>
  );
}
