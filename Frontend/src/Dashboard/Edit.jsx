import axios from "axios";
import React, { useEffect, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axiosInstance from '../services/axiosInstance';

// Custom upload adapter (no change needed)
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(file => {
      const data = new FormData();
      data.append('upload', file);
      data.append('type', 'ckeditor');

      return axios.post('http://localhost:7000/photo/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key':"farisalbeharSecretKeyFARISALBEHAR"
        }
      })
      .then(response => {
        if (!response.data.url) {
          throw new Error('Image upload failed: no URL returned');
        }
        return {
          default: response.data.url
        };
      })
      .catch(error => {
        console.error("Upload Error:", error);
        throw error;
      });
    });
  }

  abort() {}
}

function uploadPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

function Update({ slug, setActiveComponent }) {
  const [values, setValues] = useState({
    id: "", title: "", content: "", slug: "", metadescription: "",
    metakeywords: "", photo: '', status: 'draft',  // lowercase for consistency
  });
  const [newPhoto, setNewPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  if (slug) {
    axios.get(`http://localhost:7000/api/article/${slug}`, {
      headers: {
        'x-api-key': 'farisalbeharSecretKeyFARISALBEHAR' // ← استبدلها بالمفتاح الفعلي بتاعك
      }
    })
    .then((res) => {
      if (res.data && res.data.length > 0) {
        const article = res.data[0];
        setValues({
          id: article.id || "",
          title: article.title || "",
          content: article.content || "",
          slug: article.slug || "",
          metadescription: article.metadescription || "",
          metakeywords: article.metakeywords || "",
          photo: article.photo || "",
          status: (article.status || "draft").toLowerCase(),
        });
      }
      setLoading(false);
    })
    .catch((err) => {
      setError("حدث خطأ أثناء تحميل المقال.");
      console.error(err);
      setLoading(false);
    });
  }
}, [slug]);


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => setNewPhoto(e.target.files[0]);

  // New handler for CKEditor content change
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setValues(prev => ({ ...prev, content: data }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("slug", values.slug);
      formData.append("metadescription", values.metadescription);
      formData.append("metakeywords", values.metakeywords);
      formData.append("status", values.status);
      if (newPhoto) formData.append("photo", newPhoto);

      await axiosInstance.put(`/article/update/${slug}`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data"
          
        },
      });

      setActiveComponent("list"); // العودة لقائمة المقالات بعد التحديث
    } catch (err) {
      setError("فشل في التحديث: " + (err.response?.data?.message || err.message));
      console.error(err);
    }
  };

  if (loading) return <p>جارٍ التحميل...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">تعديل المقال</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>العنوان</label>
          <input className="form-control" type="text" name="title" value={values.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Slug</label>
          <input className="form-control" type="text" name="slug" value={values.slug} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Meta Keywords</label>
          <input className="form-control" type="text" name="metakeywords" value={values.metakeywords} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Meta Description</label>
          <input className="form-control" type="text" name="metadescription" value={values.metadescription} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>المحتوى</label>
          <CKEditor
            editor={ClassicEditor}
            data={values.content}       // corrected from formData.content
            config={{
              extraPlugins: [uploadPlugin],
              height: 500,
              language: 'ar',
              image: {
                toolbar: [
                  'imageTextAlternative',
                  'toggleImageCaption',
                  'imageStyle:inline',
                  'imageStyle:block',
                  'imageStyle:side',
                  'imageStyle:alignLeft',
                  'imageStyle:alignCenter',
                  'imageStyle:alignRight'
                ],
                styles: ['alignLeft', 'alignCenter', 'alignRight']
              },
              toolbar: [
                'heading', '|',
                'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify', '|',
                'uploadImage', 'blockQuote', 'insertTable', '|',
                'undo', 'redo', '|',
                'textDirection:ltr', 'textDirection:rtl'
              ],
              alignment: {
                options: ['left', 'center', 'right', 'justify']
              },
              contentsLangDirection: 'rtl',
            }}
            onChange={handleEditorChange}   // added handler
          />
        </div>
        <div className="mb-3">
          <label>الصورة الحالية</label>
          <div>
            {values.photo && (
              <img
                src={`http://localhost:7000${values.photo}`}
                alt="الصورة الحالية"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            )}
          </div>
        </div>
        <div className="mb-3">
          <label>رفع صورة جديدة</label>
          <input className="form-control" type="file" name="photo" onChange={handlePhotoChange} />
        </div>
        <div className="mb-3">
          <label>الحالة</label>
          <select className="form-select" name="status" value={values.status} onChange={handleChange}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <button className="btn btn-success" type="submit">تحديث المقال</button>
      </form>
    </div>
  );
}

export default Update;
