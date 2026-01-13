import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddComment = ({ articleName, parentId = null, onAddReply }) => {
  const [formData, setFormData] = useState({
    comment: "",
    email: "",
    name: "",
  });

  const isReply = parentId !== null;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      ...formData,
      articleName,
      parentId,
      commentType: isReply ? "reply" : "main",
      commentStatus:"draft",
    };

    try {
      const response = await fetch("http://api.farisalbehar.com/comment/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert("فشل في إضافة التعليق. حاول مرة أخرى.");
      } else {
        const newComment = await response.json();
        alert("تم إضافة التعليق بنجاح!");

        // Reset the form
        setFormData({
          comment: "",
          email: "",
          name: "",
        });

        // إذا كان هذا رد، نقوم بتحديث الردود في الواجهة
        if (isReply && onAddReply) {
          onAddReply(newComment);
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("حدث خطأ في الشبكة. حاول مرة أخرى.");
    }
  };

  return (
    <div className="container mt-4" style={{ direction: "rtl", textAlign: "right" }}>
      <h4 className="mb-3">{isReply ? "إضافة رد" : "إضافة تعليق"}</h4>
      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
        <div className="form-group mb-3">
          <textarea
            name="comment"
            placeholder="اكتب تعليقك هنا..."
            value={formData.comment}
            onChange={handleChange}
            required
            className="form-control"
            rows="4"
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="text"
            name="name"
            placeholder="الاسم"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {isReply ? "إضافة الرد" : "إضافة التعليق"}
        </button>
      </form>
    </div>
  );
};

export default AddComment;
