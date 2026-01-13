import React from 'react';
import Link from "next/link";
import '../../style/NotFound.css';
import Header from './Header';
import Footer from './Footer';

function NotFound() {
  return (
    <>
      <Header />
      <div className="notfound-container">
        {/* Floating Background Elements */}
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        
        <div className="notfound-content">
          {/* Icon */}
          <div className="notfound-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          
          {/* Main Title */}
          <h1 className="notfound-title">404</h1>
          
          {/* Subtitle */}
          <h2 className="notfound-subtitle">عذرًا، الصفحة غير موجودة!</h2>
          
          {/* Description */}
          <p className="notfound-text">
            يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو حذفها أو أنها غير موجودة. 
            يمكنك العودة إلى الصفحة الرئيسية والبدء من جديد.
          </p>
          
          {/* Button */}
          <Link href="/" className="notfound-button">
            <i className="fas fa-home"></i>
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;