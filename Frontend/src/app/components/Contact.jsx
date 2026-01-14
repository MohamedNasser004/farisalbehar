'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    email: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePhone = (phone) => /^5\d{8}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validatePhone(formData.phone)) {
      Swal.fire({
        icon: 'warning',
        title: 'رقم غير صحيح',
        text: 'رقم الهاتف يجب أن يكون 9 أرقام ويبدأ بـ 5 (مثل: 512345678)',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#667eea',
      });
      setIsLoading(false);
      return;
    }

    const payload = {
      ...formData,
      phone: '+966' + formData.phone,
    };

    try {
      const res = await fetch('http://localhost:7000/contact/send/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'تم الإرسال بنجاح! 🎉',
          text: data.message,
          confirmButtonText: 'شكرًا',
          confirmButtonColor: '#28a745',
        });
        setFormData({ name: '', phone: '', message: '' });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'خطأ في الإرسال!',
          text: data.message,
          confirmButtonText: 'حسناً',
          confirmButtonColor: '#dc3545',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'فشل الاتصال',
        text: 'تعذر إرسال البيانات. حاول مرة أخرى لاحقًا.',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#dc3545',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="contact"
      className="py-5"
      style={{
        direction: "rtl"
      }}
    >

      <div className="container">
        <div className="row g-4">

          {/* --- معلومات الاتصال --- */}
          <div className="col-lg-5">

            <div
              className="p-4"
              style={{ minHeight: "100%" }}
            >
              <h2 className="fw-400" style={{ fontSize: "35px", color: "#2c3e50" }}>
                تواصل معنا
              </h2>
              <p className="fs-5" style={{ color: "#444553ff" }}>شركة فارس البحار فى خدمتكم على مدار 24 ساعة</p>

              <h3 className="fw-300 mb-3" style={{ color: "#000000ff" }}>
                عن طريق الاتصال
              </h3>

              <div className="d-flex flex-column gap-3 mb-4">

                {[
                  { phone: "0542963671" },
                  { phone: "0591155553" },
                  { phone: "0590178160" }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={`tel:+966${item.phone}`}
                    className="d-flex align-items-center  gap-2 p-2 rounded-3 text-decoration-none fw-semibold"
                    style={{
                      background: "#f8f9fa",
                      color: "#2c3e50",
                      transition: "0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#667eea";
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.transform = "translateX(-5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f8f9fa";
                      e.currentTarget.style.color = "#2c3e50";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <span className="fs-5 bg-white rounded-5 p-2">📞</span>
                    <span>{item.phone}</span>
                  </a>
                ))}
              </div>

              <a
                href="/whatsapp-farisalbehar/"
                className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill fw-semibold text-decoration-none"
                style={{
                  background: "#25D366",
                  color: "white",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#128C7E";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#25D366";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <span>💬</span>
                تواصل عبر واتساب
              </a>
            </div>
          </div>

          {/* --- نموذج الاتصال --- */}
          <div className="col-lg-7">
            <div className="bg-white p-4 rounded-4" style={{ boxShadow: "0 8px 20px #444553ff" }} >

              <div className="text-center mb-4">
                <h3 className="fw-bold" style={{ color: "#2c3e50" }}>
                  أرسل رسالتك
                </h3>
                <p className="text-muted">
                  سيب رقم تليفونك واحنا هنتواصل معك فى اقرب وقت ممكن
                </p>
              </div>

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">الاسم الكامل *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      className="form-control p-3"
                      placeholder="أدخل اسمك بالكامل"
                      required
                      onChange={handleChange}
                      style={{ background: "#f8f9fa", borderRadius: "10px" }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">رقم الجوال *</label>

                    <div
                      className="d-flex align-items-center"
                      style={{
                        background: "#f8f9fa",
                        border: "2px solid #e0e0e0",
                        borderRadius: "10px",
                        transition: "0.3s"
                      }}
                    >
                      <span
                        className="px-3 py-2"
                        style={{
                          background: "#e9ecef",
                          borderRadius: "10px 0 0 10px",
                          fontWeight: "600",
                          color: "#666"
                        }}
                      >
                        +966
                      </span>

                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        maxLength={9}
                        placeholder="5XXXXXXX"
                        className="form-control border-0 p-3"
                        onChange={handleChange}
                        required
                        style={{
                          background: "transparent",
                          borderRadius: "0 10px 10px 0"
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold mb-1">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="form-control p-3"
                    placeholder="example@gmail.com"
                    required
                    onChange={handleChange}
                    style={{ background: "#f8f9fa", borderRadius: "10px" }}
                  />
                </div>


                <div>
                  <label className="fw-semibold mb-1">الرسالة (اختياري)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    rows="4"
                    placeholder="اكتب رسالتك هنا..."
                    className="form-control p-3"
                    onChange={handleChange}
                    style={{
                      background: "#f8f9fa",
                      borderRadius: "10px",
                      resize: "vertical",
                    }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn text-white fw-bold py-3 rounded-pill d-flex justify-content-center align-items-center gap-2"
                  disabled={isLoading}
                  style={{
                    background: isLoading
                      ? "linear-gradient(135deg, #a0a0a0 0%, #808080 100%)"
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    transition: "0.3s",
                    fontSize: "1.1rem"
                  }}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <span>📨</span>
                      أرسل الرسالة
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}