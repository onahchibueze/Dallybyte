import React from "react";
import styled from "styled-components";
import pizza from "../../images/pizza.webp";
import burger from "../../images/burger.webp";
import doughnut from "../../images/doughnut.webp";
import drink from "../../images/drink.webp";
import pastries from "../../images/pastries.webp";
import styles from "../Testimonial/testimonial.module.css";
import { Link } from "react-router-dom";
const Offers = () => {
  return (
    <div className={styles.offers}>
      <div className={styles.testimonialHeader} data-aos="fade-up">
        <h1 className={styles.testimonialHeading}>
          Satisfy your cravings—choose from 100+ fresh fast-food delights every
          week.
        </h1>
        <p className={styles.testimonialsub}>
          All your favorites, all in one place—exclusively with Dallybyte.
        </p>
      </div>

      <StyledWrapper>
        <div
          className="slider"
          style={{
            "--width": "clamp(100px, 80vw, 100px)", // min 200px, max 400px, scale with screen
            "--height": "clamp(200px, 60vw, 300px)", // responsive height
            "--quantity": 4,
          }}
        >
          <div className="list">
            <div className="item" style={{ "--position": 1 }}>
              <div
                className="card"
                style={{
                  backgroundImage: `url(${pizza})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p> Smoking fresh pizza.</p>
              </div>
            </div>

            <div className="item" style={{ "--position": 2 }}>
              <div
                className="card"
                style={{
                  backgroundImage: `url(${burger})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p>Juicy burgers.</p>
              </div>
            </div>

            <div className="item" style={{ "--position": 3 }}>
              <div
                className="card"
                style={{
                  backgroundImage: `url(${pastries})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p>Delicious breakfast.</p>
              </div>
            </div>

            <div className="item" style={{ "--position": 4 }}>
              <div
                className="card"
                style={{
                  backgroundImage: `url(${drink})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p> Nutritious Drinks.</p>
              </div>
            </div>
            <div className="item" style={{ "--position": 4 }}>
              <div
                className="card"
                style={{
                  backgroundImage: `url(${doughnut})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p> Fluffy glazed doughnut.</p>
              </div>
            </div>
          </div>
        </div>
      </StyledWrapper>

      <div className={styles.bContainer}>
        <Link to="/menupage">
          <button className={styles.btn}> See what's on the menu</button>
        </Link>
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .card {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;

    height: 100%;
    padding: 3rem;

    border-radius: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    color: white;
    text-align: center;
  }

  .card p {
    font-family: agrandir-tight-bold, Verdana, Geneva, sans-serif;
    font-size: 28px;
    color: white;
    font-weight: 600;
  }

  .slider {
    width: 100%;
    height: var(--height);
    overflow: hidden;
    mask-image: linear-gradient(
      to right,
      transparent,
      #000 10% 90%,
      transparent
    );
    padding-bottom: 5rem;
    border-bottom: 2px solid #0f346c;
  }

  .slider .list {
    display: flex;
    width: 100%;
    min-width: calc(var(--width) * var(--quantity));
    position: relative;
  }

  .slider .list .item {
    width: var(--width);
    height: var(--height);
    position: absolute;
    left: 100%;
    animation: autoRun 10s linear infinite;
    transition: filter 0.5s;
    animation-delay: calc(
      (10s / var(--quantity)) * (var(--position) - 1) - 10s
    ) !important;
  }

  .slider .list .item img {
    width: 100%;
  }

  @keyframes autoRun {
    from {
      left: 100%;
    }
    to {
      left: calc(var(--width) * -1);
    }
  }

  .slider:hover .item {
    animation-play-state: paused !important;
  }

  .slider .item:hover {
    filter: grayscale(0);
  }

  .slider[reverse="true"] .item {
    animation: reversePlay 10s linear infinite;
  }

  @keyframes reversePlay {
    from {
      left: calc(var(--width) * -1);
    }
    to {
      left: 100%;
    }
  }
`;

export default Offers;
