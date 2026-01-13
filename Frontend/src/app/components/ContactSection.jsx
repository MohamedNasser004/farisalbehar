import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function ContactPhones() {
  const phones = [
    "0542963671",
    "0590178160",
    "0591155553"
  ];

  return (
    <div className="container my-5" dir="rtl">

      <h2 className="text-center mb-4 fw-bold">للتواصل مع شركة فارس البحار</h2>

      <div className="row row-cols-1 row-cols-md-3 g-4">

        {phones.map((phone, index) => (
          <div className="col" key={index}>
            <div className="card shadow-sm border-0 text-center p-4 h-100">

              <div className="phone-box mb-3">
                <h5 className="fw-bold text-primary">رقم التواصل</h5>

                <a
                  href={`tel:+966${phone}`}
                  className="btn btn-primary mt-2 w-100 d-flex justify-content-between align-items-center"
                >
                  {phone}
                  <FontAwesomeIcon icon={faPhone} />
                </a>
              </div>

              <a
                href={`https://farisalbehar.com/whatsapp-farisalbehar`}
                target="_blank"
                className="btn btn-success w-100 d-flex justify-content-between align-items-center"
              >
                واتساب
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}