import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Sidebar.css';

const Sidebar = ({ setActiveComponent }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (component) => (e) => {
    e.preventDefault();
    setActiveComponent(component);
  };

  return (
    <div className="sidebar-wrapper">
      {/* الزر موجود برا الـ Sidebar عشان يفضل ظاهر */}
      <button
        className={`toggle-btn btn ${isOpen ? 'btn-outline-primary' : 'btn-primary'}`}
        onClick={toggleSidebar}
      >
        {isOpen ? "إغلاق →" : "فتح ←"}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`} dir="rtl">
        <div className="d-flex flex-column p-3 bg-light" style={{ height: '100vh' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-primary">لوحة التحكم</h5>
          </div>

          <Nav defaultActiveKey="/articles" className="flex-column">
            <Nav.Link href="/articles" className="text-dark mb-2" onClick={handleClick('articles')}>
              📝 عرض المقالات
            </Nav.Link>
            <Nav.Link href="/add" className="text-dark mb-2" onClick={handleClick('add-article')}>
              ➕ إضافة مقال
            </Nav.Link>
            <Nav.Link href="/comments" className="text-dark mb-2" onClick={handleClick('comments')}>
              💬 التعليقات
            </Nav.Link>
          </Nav>

          <div className="mt-auto pt-3 border-top">
            <small className="text-muted">© 2025 لوحة التحكم</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
