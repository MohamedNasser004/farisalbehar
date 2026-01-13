'use client'; // هذا مهم في Next.js 13+ (للسيرفر/العميل)

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children, allowedRole }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(null); // null = جاري التحقق

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    if (!token || role !== allowedRole) {
      router.replace('/login'); // إعادة توجيه إلى صفحة تسجيل الدخول
    } else {
      setAuthorized(true); // المستخدم مخوّل
    }
  }, [allowedRole, router]);

  if (authorized === null) {
    return <p className="alert alert-info">جارٍ التحقق من الصلاحيات...</p>;
  }

  return children;
}
