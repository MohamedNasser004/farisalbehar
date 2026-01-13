'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../services/axiosInstance';


function EditComment({ id, setActiveComponent, setSelectedSlug }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    comment: '',
    articleName: '',
    commentStatus: 'published',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`https://api.farisalbehar.com/comment/getById/${id}`)
      .then((res) => {
        const commentData = res.data;
        setValues({
          name: commentData.name,
          email: commentData.email,
          comment: commentData.comment,
          articleName: commentData.articleName,
          commentStatus: commentData.commentStatus || 'choose',
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('خطأ أثناء جلب بيانات التعليق', err);
        setError('خطأ أثناء جلب بيانات التعليق');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axiosInstance.put(
        `/comment/update-comment/${id}`,
        values,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'تم تحديث التعليق بنجاح',
        confirmButtonText: 'حسناً',
      });
    } catch (err) {
      setError(
        'حدث خطأ أثناء تحديث التعليق: ' +
          (err.response?.data?.message || err.message)
      );
      console.error(err);
    }
  };

  const handleDelete = async () => {
  const result = await Swal.fire({
    title: 'هل أنت متأكد؟',
    text: 'لن تتمكن من التراجع بعد الحذف!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'نعم، احذفه!',
    cancelButtonText: 'إلغاء',
  });

  if (result.isConfirmed) {
    try {
      await axiosInstance.delete(`/comment/delete-comment/${id}`);

      Swal.fire({
        icon: 'success',
        title: 'تم حذف التعليق',
        confirmButtonText: 'حسناً',
      });

      // يمكنك إعادة توجيه المستخدم أو تحديث العرض:
      setActiveComponent(null); // أو component آخر إن أردت
    } catch (error) {
      console.error('فشل الحذف:', error);
      Swal.fire({
        icon: 'error',
        title: 'فشل الحذف',
        text: error.response?.data?.message || 'حدث خطأ أثناء الحذف',
        confirmButtonText: 'حسناً',
      });
    }
  }
};


  if (loading) return <p className="alert alert-info">جاري تحميل البيانات...</p>;
  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">تحديث التعليق</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">الاسم:</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">البريد الإلكتروني:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="col-md-12">
          <label className="form-label">التعليق:</label>
          <textarea
            name="comment"
            value={values.comment}
            onChange={handleChange}
            required
            rows="4"
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">اسم المقالة:</label>
          <input
            type="text"
            name="articleName"
            value={values.articleName}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">حالة التعليق:</label>
          <select
            name="commentStatus"
            value={values.commentStatus}
            onChange={handleChange}
            className="form-select"
          >
            <option value="choose">اختر الحالة</option>
            <option value="published">منشور (Published)</option>
            <option value="draft">مسودة (Draft)</option>
            <option value="pending">في الانتظار (Pending)</option>
          </select>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            تحديث التعليق
          </button>

          <button
  type="button"
  className="btn btn-danger ms-2"
  onClick={handleDelete}
>
  حذف التعليق
</button>

        </div>
      </form>
      <hr className="my-4" />

      <div className="text-end">
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSelectedSlug(id);
            setActiveComponent("comments/reply");
          }}
        >
          إضافة رد
        </button>
      </div>
    </div>
  );
}

export default EditComment;
