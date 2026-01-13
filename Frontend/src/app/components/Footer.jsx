'use client';

import Image from 'next/image';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.part1}>
          <div className={styles.form}>
            <a target="_blank" href="https://www.facebook.com/forexportfaris?mibextid=2JQ9oc">
              <Image src="/assets/images/face.webp" alt="فيسبوك" width={50} height={50} loading="lazy" />
            </a>
            <a target="_blank" href="https://instagram.com/faresalbehar?igshid=NTc4MTIwNjQ2YQ==">
              <Image src="/assets/images/insta.webp" alt="إنستجرام" width={50} height={50} loading="lazy" />
            </a>
            <a target="_blank" href="https://www.tiktok.com/@faresalbehar1?is_from_webapp=1&sender_device=pc">
              <Image src="/assets/images/tiktok.webp" alt="تيك توك" width={50} height={50} loading="lazy" />
            </a>
            <a target="_blank" href="https://www.youtube.com/channel/UCjDHndw5jhlDqiYIGiJKd4A">
              <Image src="/assets/images/youtube.webp" alt="يوتيوب" width={50} height={50} loading="lazy" />
            </a>
          </div>
        </div>

        <div className={styles.part2}>
          <p>
            © 2026 فارس البحار<br />
            Powered by <a href="https://abualfadlmarketing.com/">Abu AL-Fadl</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
