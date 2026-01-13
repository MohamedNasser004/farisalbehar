"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function About() {

    return (

        <div id="our_company">
            <div className="container pt-5 pb-5">
                <div className="row align-items-center">
                    <div className="col-md-6 mb-2">
                        <h2 style={{fontSize: "35px" , fontWeight:"400"}}>شركة فارس البحار</h2>
                        
                        <div className="d-flex align-items-start mb-3">
                            <span className="text-success me-2" style={{fontSize: "20px" , fontWeight:"600" , marginLeft: "5px"}}>✓</span>
                            <p style={{fontSize: "18px", color:"#444553ff", margin: 0}}>
                                لشحن و تصدير السيارات من السعودية إلى مصر حيث تمتلك الشركة خبرة أكثر من خمسة عشر عاماَ في مجال شحن و تصدير السيارات من السعودية إلى مصر.
                            </p>
                        </div>
                        
                        <div className="d-flex align-items-start mb-3">
                            <span className="text-success me-2" style={{fontSize: "20px" , fontWeight:"600" , marginLeft: "5px"}}>✓</span>
                            <p style={{fontSize: "18px", color:"#444553ff", margin: 0}}>
                                و تمتلك الشركة أيضاَ فريق عمل خبرة ومدرب على أعلى مستوى من الكفاءة والاحترافية واللى بيهتم بسيارتك لضمان وصولها بأمان إلى وجهتها في مصر.
                            </p>
                        </div>
                        
                        <div className="d-flex align-items-start mb-3">
                            <span className="text-success me-2" style={{fontSize: "20px" , fontWeight:"600" , marginLeft: "5px"}}>✓ </span>
                            <p style={{fontSize: "18px", color:"#444553ff", margin: 0}}>
                                كما نوفر لكم الشحن بكافة الانظمة (تصدير - تريبتيك - مالك أول ) كما ان شركتنا معتمدة لدى وكلاء العبارات حيث تمتلك فريق عمل يساعدك على إنهاء كافة الإجراءات الجمركية من اول استلام سيارتك في السعودية إلى وصولها إلى الميناء بمصر
                            </p>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="bg-light p-3 px-4 text-center rounded-2" style={{width: "48%"}}>
                                <h3 style={{fontSize: "25px"}}>+15</h3>
                                <p style={{fontSize: "25px"}}>سنوات الخبرة</p>
                            </div>
                            <div className="bg-light p-3 px-4 text-center rounded-2" style={{width: "48%"}}>
                                <h3 style={{fontSize: "20px"}}>+500</h3>
                                <p style={{fontSize: "25px"}}>سيارات تم شحنها</p>
                            </div>
                        </div>

                        
                    </div>
                    <div className="col-md-6 mb-4 mb-md-0">
                        <Image
                            src="/assets/images/x.webp"
                            alt="Logo"
                            width={400}
                            height={600}
                            layout="responsive"
                            className="w-100 rounded shadow"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}