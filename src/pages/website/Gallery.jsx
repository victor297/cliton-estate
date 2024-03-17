import React, { useEffect } from "react";
import WebsiteNav from "../../components/navbar/WebsiteNav";

import styled from "styled-components";
import Background from "../../components/websiste/Background";
import Footer from "../../components/Footer";

import gallery_main from "../../assets/gallery/gallery_main_image.png";
import image_1 from "../../assets/gallery/gallery_image_1.png";
import image_2 from "../../assets/gallery/gallery_image_2.png";
import image_3 from "../../assets/gallery/gallery_image_3.png";
import image_4 from "../../assets/gallery/gallery_image_4.png";
import image_5 from "../../assets/gallery/gallery_image_5.png";
import image_6 from "../../assets/gallery/gallery_image_6.png";
import image_7 from "../../assets/gallery/gallery_image_7.png";
import image_8 from "../../assets/gallery/gallery_image_8.png";
import image_9 from "../../assets/gallery/gallery_image_9.png";
import image_10 from "../../assets/gallery/gallery_image_10.png";
import image_11 from "../../assets/gallery/gallery_image_11.png";
import image_12 from "../../assets/gallery/gallery_image_12.png";

const Gallery = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <GalleryStyle>
      <WebsiteNav activePage="gallery" />
      <div className="gallery-container">
        <section id="section-1" className="section-1">
          <Background />
          <h3>Our Gallery</h3>
          <p className="paragraph">
            Step into our Gallery to witness the embodiment of our vision and
            hard work. Here, we feature a curated selection of images from our
            most esteemed projects with each image telling a story of
            innovation, precision and a commitment to excellence. Browse through
            to see the spaces we've transformed and the lives we've enriched
            through our dedication to creating not just buildings, but legacies.
          </p>

          <div className="section-1-img">
            <img src={gallery_main} alt="helmet" />
          </div>
        </section>

        <section className="section-2">
          <div className="images-header">
            <h3>Look Through Our Gallery</h3>
            <p className="text">
              Your Dream, Our Design - Find Inspiration in Our Gallery
            </p>
          </div>

          <div className="gallery-grid">
            <div className="gallery-image">
              <img src={image_1} alt="" />
            </div>
            <div className="gallery-image">
              <img src={image_2} alt="" />
            </div>
            <div className="gallery-image">
              <img src={image_3} alt="" />
            </div>
            <div className="gallery-image">
              <img src={image_4} alt="" />
            </div>
            <div className="gallery-image">
              <img src={image_5} alt="" />
            </div>
            <div className="gallery-image">
              <img src={image_6} alt="" />
            </div>
            <div className="gallery-image">
              <img src={image_7} alt="" />
            </div>
            <div className="gallery-image">
              <img src={image_8} alt="" />
            </div>
            <div className="gallery-image">
              <img src={image_9} alt="" />
            </div>
            <div className="gallery-image">
              <img src={image_10} alt="" />
            </div>
            <div className="gallery-image">
              <img src={image_11} alt="" />
            </div>
            <div className="gallery-image">
              <img src={image_12} alt="" />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </GalleryStyle>
  );
};

export default Gallery;

const GalleryStyle = styled.div`
  .gallery-container {
    padding: 120px 0px;
    h3 {
      font-weight: 500;
      font-size: 48px;
      letter-spacing: 0.001em;
      color: #192861;
      margin-bottom: 40px;
    }
    .paragraph {
      font-weight: 400;
      font-size: 24px;
      letter-spacing: 0.001em;
      margin-bottom: 40px;
      color: #192861;
      line-height: 40px;
    }

    .section-1 {
      margin-bottom: 215px;
      padding: 0px 112px;
      .section-1-img {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        img {
          width: 100%;
          object-fit: cover;
        }
        margin-bottom: 40px;
      }
    }

    .section-2 {
      .images-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 92px;
        h3 {
          font-weight: 500;
          font-size: 48px;
          letter-spacing: 0.001em;
          color: #192861;
          margin-bottom: 16px;
        }
        .text {
          font-weight: 400;
          font-size: 20px;
          letter-spacing: 0.001em;
          margin-bottom: 56px;
          color: #192861;
          line-height: 40px;
        }
      }

      .gallery-grid {
        display: grid;
        gap: 30px;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;
        margin: 0px auto;

        .gallery-image {
          width: 100%;
          height: 450px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .gallery-container {
      padding: 10px;
      h3 {
        font-size: 30px;
      }
      .paragraph {
        font-size: 16px;
      }
      .section-1 {
        margin-bottom: 115px;
        padding: 0px;
      }

      .section-2 {
        .images-header {
          h3 {
            font-weight: 500;
            font-size: 30px;
          }
          .text {
            font-weight: 400;
            font-size: 16px;
          }
        }

        .gallery-grid {
          grid-template-columns: 1fr;
        }
      }
    }
  }
`;
