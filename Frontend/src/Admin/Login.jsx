'use client'; // مهم لاستخدام sessionStorage و useRouter

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css"; // إذا كان لديك CSS مخصص

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const onsubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:7000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.role);

        if (data.role === "admin") {
          router.push("/dashboard"); // التنقل في Next.js
        } else {
          Swal.fire({
            icon: "error",
            title: "صلاحية غير كافية",
            text: "هذا الحساب غير مصرح له بالدخول للوحة التحكم.",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "فشل تسجيل الدخول",
          text: data.message || "حدث خطأ أثناء تسجيل الدخول.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "خطأ في الاتصال",
        text: err.message || "حدث خطأ أثناء محاولة الاتصال بالخادم.",
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
         <div style={{textAlign : "center"}}>
          <img src="/assets/images/logo.webp" alt="شركة فارس البحار" style={{
          width: "100px",
        }}/>
        </div>
        <h3 className="text-center mb-4">تسجيل الدخول</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={onsubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="mb-2">البريد الإلكتروني:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password"  className="mb-2">كلمة المرور:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}
