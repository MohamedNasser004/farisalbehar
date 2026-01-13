'use client';

import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

function ReplyComment({ commentId, onBack }) {
  const [originalComment, setOriginalComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!commentId) return;

    axios
      .get(`https://api.farisalbehar.com/comment/getById/${commentId}`)
      .then((res) => {
        setOriginalComment(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("خطأ في جلب التعليق الأصلي");
        setLoading(false);
        Swal.fire("خطأ", "فشل في تحميل التعليق", "error");
      });
  }, [commentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reply.trim()) {
      Swal.fire("تحذير", "يرجى كتابة الرد", "warning");
      return;
    }

    try {
      const replyData = {
        comment: reply,
        name: "شركة اليسر للشحن",
        email: "sales@farisalbehar.com",
        articleName: originalComment.articleName,
        commentType: "reply",
        parentId: originalComment.id,
        commentStatus: "published",
      };

      await axios.post(`https://api.farisalbehar.com/comment/add`, replyData, {
        headers: { "Content-Type": "application/json" },
      });

      Swal.fire({
        icon: "success",
        title: "تم إرسال الرد بنجاح",
        confirmButtonText: "حسناً",
      }).then(() => {
        onBack?.(); // استدعاء تابع الرجوع إذا كان موجود
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: err.response?.data?.message || "حدث خطأ أثناء إرسال الرد",
      });
    }
  };

  if (loading) return <p className="alert alert-info">جاري تحميل التعليق...</p>;
  if (error) return <p className="alert alert-danger">{error}</p>;
  if (!originalComment) return <p className="alert alert-warning">لا يوجد تعليق</p>;

  return (
    <div className="container mt-4 border p-3 bg-light">
      <h4>رد على تعليق المستخدم</h4>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">من: {originalComment.name}</h5>
          <p className="card-text">{originalComment.comment}</p>
          <small className="text-muted">المقالة: {originalComment.articleName}</small>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="reply" className="form-label">الرد:</label>
          <textarea
            id="reply"
            className="form-control"
            rows="4"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">إرسال الرد</button>
        <button type="button" className="btn btn-secondary" onClick={onBack}>إلغاء</button>
      </form>
    </div>
  );
}

export default ReplyComment;
