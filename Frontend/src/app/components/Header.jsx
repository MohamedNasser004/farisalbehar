"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-dark">
      <div className="container-fluid pt-2 pb-2 ps-3 pe-30">
        <Link href="/" className="navbar-brand">
          <Image
            src="/assets/images/logo.webp"
            alt="Logo"
            width={70}
            height={70}
            className="w-100"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0" style={{ direction: "rtl" , fontSize : "15px"  }}>
            <li className="nav-item">
              <Link href="/" className="nav-link active bg-white rounded-3	pt-2 pb-2 ps-3 pe-3 m-2">الرئيسية</Link>
            </li>
            <li className="nav-item">
              <Link href="/#our_company" className="nav-link bg-white rounded-3	pt-2 pb-2 ps-3 pe-3 m-2">عن الشركة</Link>
            </li>
            <li className="nav-item">
              <Link href="/#success" className="nav-link bg-white rounded-3	pt-2 pb-2 ps-3 pe-3 m-2">نجاحاتنا السابقة</Link>
            </li>
            <li className="nav-item">
              <Link href="/#services" className="nav-link bg-white rounded-3	pt-2 pb-2 ps-3 pe-3 m-2">خدماتنا</Link>
            </li>
             <li className="nav-item">
              <Link href="/#contact" className="nav-link bg-white rounded-3	pt-2 pb-2 ps-3 pe-3 m-2">تواصل معنا</Link>
            </li>
             <li className="nav-item">
              <Link href="/#location" className="nav-link bg-white rounded-3	pt-2 pb-2 ps-3 pe-3 m-2">موقعنا</Link>
            </li>
            <li className="nav-item">
              <Link href="/articles" className="nav-link bg-white rounded-3	pt-2 pb-2 ps-3 pe-3 m-2">مدونة</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
