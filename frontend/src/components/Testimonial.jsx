import React, { useEffect } from "react";
import person from "../images/person.webp";
import cafe from "../images/cafe.webp";
import home from "../images/home.webp";
import styles from "./testimonial.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Testimonial = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: false, // false = animate every time you scroll back
      offset: 100, // start animation before fully in view
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.testimonialHeader} data-aos="fade-up">
        <h1 className={styles.testimonialHeading}>
          Whatever your week looks like,
          <span> delicious foods are guaranteed</span>
        </h1>
        <p className={styles.testimonialsub}>
          From quick-prep recipes to ready-made meals, DALLYBYTE gives you more
        </p>
        <p className={styles.testimonialsub}>
          time, less stress, and better eating—night after night.
        </p>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.mainContent} data-aos="fade-up">
          <div className={styles.imgContainer}>
            <img src={home} alt="" />
          </div>
          <div
            className={styles.mainText}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1 className={styles.textHeading}>
              91% of our customers feel happier using DallyByte
            </h1>
            <p className={styles.textSub}>
              Enjoy delicious, fast foods without sacrificing quality, variety
              or your health goals.
            </p>
          </div>
        </div>

        <div
          className={`${styles.mainContent} ${styles.reverse}`}
          data-aos="fade-up"
        >
          <div
            className={styles.mainText}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1 className={styles.textHeading}>
              93% of our customers feel less stressed at dinner time
            </h1>
            <p className={styles.textSub}>
              With foolproof recipes, flexible portions, and crowd-pleasing
              options, dinner feels easier from start to finish.
            </p>
          </div>
          <div className={styles.imgContainer}>
            <img src={cafe} alt="" />
          </div>
        </div>

        <div className={styles.mainContent} data-aos="fade-up">
          <div className={styles.imgContainer}>
            <img src={person} alt="" />
          </div>
          <div
            className={styles.mainText}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1 className={styles.textHeading}>
              91% of our customers feel comfort when they order from DallyByte
            </h1>
            <p className={styles.textSub}>
              When you eat at our cafe you’ll feel the warmth and comfort of
              home in every bite.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
