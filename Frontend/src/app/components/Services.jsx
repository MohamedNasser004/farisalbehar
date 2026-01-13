'use client';

import Image from 'next/image';
import React from 'react';

export default function OurServices() {

    const services = [
        {
            name: "التأمين و التغليف",
            icon: "📦",
            description: "تمتلك الشركة فريق عمل مدرب على التعامل مع كافة انواع السيارات حيث يقوموا بتغليف السيارات تغليفاً مناسباً لحماية السيارة من اى ضرر أثناء النقل."
        },
        {
            name: "الإجراءات الجمركية",
            icon: "📑",
            description: "لدى الشركة فريق متخصص مهمته مساعدتك في انهاء كافة الاجراءات و التخليصات الجمركية عند شحن سياراتك في السعودية و مصر. "
        },
        // {
        //     name: "شحن السيارات بمختلف طرق التصاريح",
        //     icon: "🚢",
        //     description: "يمكن لشركة فارس البحار شحن سيارات من اى مكان في المملكة العربية السعودية إلى مصر"
        // },
        {
            name: "المتابعة المستمرة",
            icon: "📱",
            description: "نوفر لك متابعة مستمرة لشحنتك في كل مرحلة مع فريق دعم متاح على مدار الساعة"
        },
        {
            name: "أسعار تنافسية",
            icon: "💵",
            description: "نقدم أفضل الأسعار التنافسية في السوق مع الحفاظ على أعلى معايير الجودة والخدمة"
        },
        {
            name: "تغطية شاملة",
            icon: "🛡️",
            description: "خدماتنا تغطي جميع مناطق السعودية ومصر مع ضمان وصول آمن وسليم لسيارتك"
        },
    ];

    return (
        <div className="services bg-light py-5" id="services" dir="rtl">

            {/* Header */}
            <div className="text-center mb-5">
                <h1 className="fw-bold position-relative d-inline-block"
                    style={{ fontSize: "2.5rem", color: "#000", fontWeight: "400" }}>
                    خدماتنا
                </h1>

                <p className="text-muted mt-3" style={{ fontSize: "1.2rem", color: "#444553ff" }}>
                    نقدم لكم مجموعة متكاملة من خدمات شحن السيارات بأعلى معايير الجودة
                </p>
            </div>

            {/* Services Grid */}
            <div className="container">
                <div className="row g-4">

                    {services.map((service, i) => (
                        <div key={i} className="col-lg-4 col-md-6">

                            <div className="p-4 bg-white rounded-4 shadow-sm border h-100 position-relative service-card text-center"
                                style={{ transition: "0.3s" }}>

                                {/* Icon */}
                                <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-3"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        fontSize: "2rem",
                                        background: "linear-gradient(135deg, #000, #444553ff)",
                                        color: "white",
                                        boxShadow: "0 6px 15px rgba(102, 126, 234, 0.3)"
                                    }}>
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h4 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>
                                    {service.name}
                                </h4>

                                {/* Description */}
                                <p className="text-muted text-center" style={{ textAlign: "justify", color: "#444553ff" }}>
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* Permits Section */}
            <div className="container mt-5">
                <div className="bg-white rounded-4 shadow py-4 px-2 text-center">

                    <h2 className="fw-bold position-relative d-inline-block mb-3"
                        style={{ fontSize: "2rem", color: "#2c3e50" }}>
                        شحن السيارات بمختلف طرق التصاريح
                        <span className="position-absolute"
                            style={{
                                bottom: "-8px",
                                right: "50%",
                                transform: "translateX(50%)",
                                width: "120px",
                                height: "3px",
                                borderRadius: "2px"
                            }}>
                        </span>
                    </h2>

                    <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
                        يمكن لشركة فارس البحار شحن سيارات من اى مكان في المملكة العربية السعودية إلى مصر
                    </p>

                    {/* Types Images */}
                    <div className="d-flex justify-content-center gap-1 flex-nowrap my-4">

                        <a href="/whatsapp-farisalbehar/" className="d-block rounded-3 shadow-sm overflow-hidden">
                            <Image src="/assets/images/11.webp" width={100} height={100} alt="تصاريح" />
                        </a>

                        <a href="/whatsapp-farisalbehar/" className="d-block rounded-3 shadow-sm overflow-hidden">
                            <Image src="/assets/images/22.webp" width={100} height={100} alt="تصاريح" />
                        </a>

                        <a href="/whatsapp-farisalbehar/" className="d-block rounded-3 shadow-sm overflow-hidden">
                            <Image src="/assets/images/33.webp" width={100} height={100} alt="تصاريح" />
                        </a>

                    </div>

                    {/* Title */}
                    <h3 className="p-3 rounded-3 d-inline-block"
                        style={{
                            background: "#f8f9fa",
                            color: " #444553ff",
                            fontSize: "20px",
                            fontWeight: "400",
                        }}>
                        مبادرة سيارات المصريين بالخارج
                    </h3>

                </div>
            </div>

        </div>
    );
}
