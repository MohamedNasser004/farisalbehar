"use client"; // لو تستخدم app router

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

const Whatsapp = ({ phoneNumber = "966542963671" }) => {
  const router = useRouter();

  useEffect(() => {
    const whatsappLink = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text&app_absent=0`;

    // إعادة التوجيه تلقائيًا
    window.location.href = whatsappLink;
  }, [phoneNumber]);

  return (
    <>
      <Header />
      <div className="container py-5 text-center">
        <p>يتم تحويلك إلى الواتساب...</p>
      </div>
      <Footer />
    </>
  );
};

export default Whatsapp;
