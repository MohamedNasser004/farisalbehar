import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails';
import AddBlog from './components/AddBlog';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:title" element={<BlogDetails />} />
        <Route path="/add-blog" element={<AddBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
