// components/AllComments.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AllComments({ setActiveComponent, setSelectedSlug }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [articleName, setArticleName] = useState("");

  useEffect(() => {
    axios
      .get("https://api.farisalbehar.com/comment/all")
      .then((res) => {
        setComments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("خطأ أثناء جلب التعليقات");
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleUpdate = (id) => {
    if (typeof setSelectedSlug === "function") {
      setSelectedSlug(id);
      setActiveComponent("comments/update");
    } else {
      console.error("setSelectedSlug is not defined as a function");
    }
  };

  const filteredComments = comments.filter((comment) => {
    const statusMatch =
      statusFilter === "all" || comment.commentStatus.toLowerCase() === statusFilter;
    const slugMatch =
      articleName === "" || comment.articleName.includes(articleName);
    return statusMatch && slugMatch;
  });

  if (loading) return <p>جاري تحميل التعليقات...</p>;
  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">كل التعليقات</h2>

      {/* فلاتر التصفية */}
      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">كل الحالات</option>
            <option value="published">منشور (Published)</option>
            <option value="draft">مسودة (Draft)</option>
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="بحث حسب Article Slug"
            value={articleName}
            onChange={(e) => setArticleName(e.target.value)}
          />
        </div>
      </div>

      {/* عرض التعليقات */}
      {filteredComments.length > 0 ? (
        <div className="row">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="col-md-6 mb-4"
              onClick={() => handleUpdate(comment.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{comment.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {comment.articleName} -{" "}
                    <span
                      className={`badge ${
                        comment.commentStatus === "published"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {comment.commentStatus === "published" ? "منشور" : "مسودة"}
                    </span>
                  </h6>
                  <p className="card-text">{comment.comment}</p>
                  <span className="badge bg-primary">
                    Slug: {comment.articleName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="alert alert-warning">لا توجد تعليقات بعد.</p>
      )}
    </div>
  );
}

export default AllComments;
