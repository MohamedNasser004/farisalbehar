import React, { useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axiosInstance from '../services/axiosInstance';
import axios from 'axios';

class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(file => {
            const data = new FormData();
            data.append('upload', file);
            data.append('type', 'ckeditor');

            return axios.post('https://api.farisalbehar.com/photo/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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

    abort() {
        // Optional
    }
}

function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}

const AddBlog = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        photo: null,
        metadescription: "",
        metakeywords: "",
        slug: "",
        status: "draft",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setFormData(prev => ({ ...prev, content: data }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("content", formData.content);
        formDataToSend.append("metadescription", formData.metadescription);
        formDataToSend.append("metakeywords", formData.metakeywords);
        formDataToSend.append("slug", formData.slug);
        formDataToSend.append("status", formData.status);

        if (formData.photo) {
            formDataToSend.append("photo", formData.photo);
        }

        try {
            const response = await axiosInstance.post("/article/add", formDataToSend);
            if (response.status === 200 || response.status === 201) {
                alert("تمت إضافة المقالة بنجاح!");
            } else {
                alert("حدث خطأ أثناء إضافة المقالة.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("حدث خطأ أثناء الاتصال بالخادم.");
        }
    };

    return (
        <div className="add-blog-container">
            <h2>إضافة مقالة جديدة</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title" style={{ fontWeight: "500", fontSize: "30px" }}>العنوان</label>
                    <br />
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={{ width: "95%", height: "30px", color: "black" }}
                    />
                </div>

                <div>
                    <label htmlFor="content" style={{ fontWeight: "500", fontSize: "30px" }}>المحتوى</label>
                    <br />
                    <CKEditor
                        editor={ClassicEditor}
                        data={formData.content}
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
                        onChange={handleEditorChange}
                    />
                </div>

                <br />
                <h2>Preview:</h2>
                <div
                    style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px", backgroundColor: "#f9f9f9" }}
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                ></div>

                <br />
                <label htmlFor="photo" style={{ fontWeight: "500", fontSize: "30px" }}>Photo</label>
                <br />
                <input
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                    required
                    style={{ width: "95%", height: "30px", color: "black" }}
                />
                <br /><br />

                <label htmlFor="metadescription" style={{ fontWeight: "500", fontSize: "30px" }}>Metadescription</label>
                <br />
                <textarea
                    name="metadescription"
                    placeholder="Meta Description"
                    value={formData.metadescription}
                    onChange={handleChange}
                    required
                    style={{ width: "95%", height: "100px", color: "black" }}
                />
                <br /><br />

                <label htmlFor="metakeywords" style={{ fontWeight: "500", fontSize: "30px" }}>Metakeywords</label>
                <br />
                <textarea
                    name="metakeywords"
                    placeholder="Meta Keywords (comma separated)"
                    value={formData.metakeywords}
                    onChange={handleChange}
                    required
                    style={{ width: "95%", height: "100px", color: "black" }}
                />
                <br /><br />

                <label htmlFor="slug" style={{ fontWeight: "500", fontSize: "30px" }}>Slug</label>
                <br />
                <input
                    type="text"
                    name="slug"
                    placeholder="Slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    style={{ width: "95%", height: "30px", color: "black" }}
                />
                <br /><br />

                <label htmlFor="status" style={{ fontWeight: "500", fontSize: "30px" }}>Status</label>
                <br />
                <select name="status" value={formData.status} onChange={handleChange} style={{ width: "100px", height: "30px" }}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
                <br /><br />

                <button type="submit">Add Article</button>
            </form>
        </div>
    );
};

export default AddBlog;
