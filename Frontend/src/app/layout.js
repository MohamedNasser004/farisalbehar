import { Tajawal } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import "../style/fonts.css";
import "bootstrap/dist/css/bootstrap.min.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata = {
  authors: [{ name: "شركة فارس البحار" }],
  metadataBase: new URL("https://farisalbehar.com"),
  title: "شركة فارس البحار",
  description: "لشحن و تصدير السيارات من السعودية الى مصر",
  url: "https://farisalbehar.com",
  siteName: "شركة فارس البحار",
  locale: "ar_EG",
  type: "website",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>
        
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5HPHMBRKQW"
        ></Script>

        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5HPHMBRKQW');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
