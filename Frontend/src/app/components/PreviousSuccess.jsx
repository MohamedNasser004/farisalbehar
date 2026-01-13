"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function PreviousSuccess() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const slides = [
    {
      href: "https://www.facebook.com/forexportfaris/posts/pfbid02DLS2oecyraTkhtMei1trANsXRNirqmrfuvQLj5Eucio8VKXBZJVabpkDonpkr83Ul",
      img: "/assets/images/farisalbehar_1.webp",
      title: "شحن ناجح للسيارات",
      description: "عملية شحن آمنة وموثوقة",
    },
    {
      href: "https://www.facebook.com/forexportfaris/posts/pfbid0wqk398Yg957C2HBJXbZF6tcpsd8LBvu56iPjep8NTttdUCg9cbg7EauoY8nQ4zyDl",
      img: "/assets/images/farisalbehar_2.webp",
      title: "تغليف احترافي",
      description: "حماية كاملة للسيارة أثناء النقل",
    },
    {
      href: "https://www.facebook.com/forexportfaris/posts/pfbid0dfsAWczdDMd5MwiUWHrcfzDtZqCRbirrp43tarm7dz8X5fmmgcwKYcSPYsJ86D8Nl",
      img: "/assets/images/farisalbehar_3.webp",
      title: "وصول آمن",
      description: "تسليم السيارة بحالة ممتازة",
    },
    {
      href: "https://www.facebook.com/watch/?v=280506968343311",
      img: "/assets/images/farisalbehar_4.webp",
      title: "عمليات متنوعة",
      description: "شحن جميع أنواع السيارات",
    },
    {
      href: null,
      img: "/assets/images/farisalbehar_6.webp",
      title: "ثقة العملاء",
      description: "شهادات رضا من عملائنا",
    },
  ];

  return (
    <section
      className="py-5"
      id="success"
      style={{
        backgroundColor: "black",
        direction: "rtl",
      }}
    >
      <div className="container text-center">

        {/* عنوان رئيسي */}
        <h2
          className="fw-bold mb-3"
          style={{
            fontSize: "2.5rem",
            color: "white",
            position: "relative",
            display: "inline-block",
          }}
        >
          نجاحاتنا السابقة
          <span
            style={{
              content: "",
              position: "absolute",
              bottom: "-12px",
              right: "50%",
              transform: "translateX(50%)",
              width: "80px",
              height: "4px",
              borderRadius: "2px",
              display: "block",
            }}
          ></span>
        </h2>

        <p className="mx-auto" style={{ maxWidth: "600px" , color:"#444553ff"}}>
          شاهد بعض عمليات الشحن الناجحة التي نفذناها بعناية واحترافية
        </p>

      </div>

      <div className="container mt-4">

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          loop={true}
          centeredSlides={true}
          navigation
          pagination={{ clickable: true }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2,
            slideShadows: true,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="rounded-4 overflow-hidden shadow"
                style={{
                  transition: "0.3s",
                  background: "white",
                }}
              >
                <div className="position-relative overflow-hidden">
                  <Image
                    src={slide.img}
                    width={600}
                    height={400}
                    className="w-100"
                    style={{ height: "300px", objectFit: "cover" }}
                    alt="شحن سيارات"
                  />

                  {slide.href && (
                    <a
                      href={slide.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                      style={{
                        background: "rgba(102, 126, 234, 0.85)",
                        opacity: 0,
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                    >
                      <div className="text-white text-center">
                        <div style={{ fontSize: "2rem" }}>👁️</div>
                        <span>عرض التفاصيل</span>
                      </div>
                    </a>
                  )}
                </div>

                <div className="p-3 text-center">
                  <h5 className="fw-bold" style={{ color: "#2c3e50" }}>
                    {slide.title}
                  </h5>
                  <p className="text-muted">{slide.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* عناصر التحكم */}
        <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
          <div className="swiper-button-prev bg-white rounded-circle shadow" style={{ width: "50px", height: "50px" }}></div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next bg-white rounded-circle shadow" style={{ width: "50px", height: "50px" }}></div>
        </div>
      </div>
    </section>
  );
}
