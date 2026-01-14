import React, { useEffect, useState } from 'react';
import { getBlogs, handleDelete } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const BlogList = ({ setActiveComponent, setSelectedSlug }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs()
      .then((response) => setBlogs(response.data))
      .catch(console.error);
  }, []);

  const handleUpdate = (slug) => {
    setSelectedSlug(slug); // هنا بنحدد الـ slug
    setActiveComponent("update"); // بنعمل تفعيل للـ Update
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">قائمة المقالات</h1>
      <div className="row">
        {blogs.map((blog, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <img
                src={`http://localhost:7000${blog.photo}`}
                className="card-img-top"
                alt={blog.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  <a href={`/${blog.slug}`} className="text-decoration-none text-dark">
                    {blog.title}
                  </a>
                </h5>
                <p className="card-text">{blog.metadescription}</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleUpdate(blog.slug)} // استدعاء الـ Update
                >
                  Update
                </button>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-danger w-100"
                  onClick={() => handleDelete(blog.slug)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
