import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardHeader = ({ activeComponent, previousComponent, handleBack }) => {
  // الأسماء العربية للـ Components
  const componentNames = {
    articles: "المقالات",
    comments: "التعليقات",
    "add-article": "إضافة مقال",
    update: "تحديث مقال",
    "comments/update": "تحديث تعليق",
  };

  const isMainPage = activeComponent === "articles" || activeComponent === "comments";

  return (
    <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light border-bottom">
      <h4>{componentNames[activeComponent]}</h4>

      <button 
        className="btn btn-secondary" 
        onClick={handleBack}
      >
        {isMainPage ? "العودة إلى الـ Dashboard" : "رجوع"}
      </button>
    </div>
  );
};

export default DashboardHeader;
