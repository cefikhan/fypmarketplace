import React from 'react';

import styles from './Footer.module.css';

function Footer () {

  return (
    <section className={styles.footer}>
      <hr className={styles.footer_seperator} />
      <section className={styles.footer_social_media}>
        <a href="/" target="_blank" rel="noopener noreferrer">NFTLAND</a>
      </section>
      <section className={styles.footer_info}>
        <section className={styles.footer_info_left}>
          <section className={styles.footer_info__name}>
              TRADE NFTS
          </section>
          <section className={styles.footer_info__returns}>
            Returns Policy
            <br />
            Delivery
          </section>        
        </section>
        <section className={styles.footer_info_center}>
          <section className={styles.footer_info__email}>
            saffi@gmail.com
          </section>
          <section className={styles.footer_info__terms}>
            Terms and Conditions
            <br />
            Copyright
          </section>
        </section>
        <section className={styles.footer_info_right}>
          <section className={styles.footer_info__number}>
          
          </section>
          <section className={styles.footer_info__contact}>
            About Us
            <br />
            Contact Us
          </section>
        </section>
      </section>
      <hr className={styles.footer_seperator} />
    </section>
  )

}

export default Footer;