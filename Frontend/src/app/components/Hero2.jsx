"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./phones.css";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/assets/images/background.png",
      title: "شركة فارس البحار",
      description: "لشحن وتصدير السيارات من السعودية إلى مصر",
    },
    {
      image: "/assets/images/background2.png",
      title: "شركة فارس البحار",
      description:
        "خبرة أكثر من خمسة عشر عاماً فى مجال شحن السيارات من السعودية إلى مصر",
    },
    {
      image: "/assets/images/hero.png",
      title: "شركة فارس البحار",
      description:
        "شحن السيارات بمختلف أنواع التصاريح (تصدير - تريبتيك - مالك أول)",
    },
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const goToNextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const goToPrevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="hero-section">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentSlide ? "active" : ""}`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title">{slides[currentSlide].title}</h1>
        <p className="hero-text">{slides[currentSlide].description}</p>

        <div className="hero-buttons">
          <a href="/whatsapp-farisalbehar/">
            <button className="btn btn-primary">واتساب</button>
          </a>
          <a href="tel:+9660542963671">
            <button className="btn btn-secondary">تليفون</button>
          </a>
        </div>
      </div>

      {/* Indicators */}
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={index === currentSlide ? "active" : ""}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Navigation */}
      <button className="hero-nav prev" onClick={goToPrevSlide}>
        ‹
      </button>
      <button className="hero-nav next" onClick={goToNextSlide}>
        ›
      </button>
    </div>
  );
}
