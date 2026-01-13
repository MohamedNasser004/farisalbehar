export default function Location() {
  return (
    <div className="location" id="location">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14505.614643093895!2d46.7055497!3d24.6442303!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f05fec7904de9%3A0xa0aa8c8b17286b78!2z2YXZg9iq2Kgg2YHYp9ix2LMg2KfZhNio2K3Yp9ix!5e0!3m2!1sar!2seg!4v1710093547573!5m2!1sar!2seg"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
