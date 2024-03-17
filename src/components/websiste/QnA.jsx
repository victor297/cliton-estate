import React from "react";
import Collapsible from "react-collapsible";
import add_icon from "../../assets/home/add.svg";
import styled from "styled-components";

const triggerStyle = {
  backgroundColor: "red",
};

const QnA = () => {
  return (
    <QnaStyle>
      <div className="heading">
        <h3>Frequently Asked Questions</h3>
        <p>Get the answers you seek</p>
      </div>

      <div className="accordion-grid">
        <Collapsible
          trigger={
            <div className="trigger-wrapper">
              <p>What kind of properties do you specialize in?</p>
              <img src={add_icon} alt="" />
            </div>
          }
          triggerStyle={triggerStyle}
        >
          <p className="accordion-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo iste
            quod necessitatibus commodi similique fuga temporibus aliquid
            explicabo ipsam quo? Facere aperiam unde quasi? Porro praesentium
            non quibusdam laudantium sapiente!
          </p>
        </Collapsible>
        <Collapsible
          trigger={
            <div className="trigger-wrapper">
              <p>Can I see past projects ?</p>
              <img src={add_icon} alt="" />
            </div>
          }
          triggerStyle={triggerStyle}
        >
          <p className="accordion-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo iste
            quod necessitatibus commodi similique fuga temporibus aliquid
            explicabo ipsam quo? Facere aperiam unde quasi? Porro praesentium
            non quibusdam laudantium sapiente!
          </p>
        </Collapsible>
        <Collapsible
          trigger={
            <div className="trigger-wrapper">
              <p>How can I stay informed about new projects or listings?</p>
              <img src={add_icon} alt="" />
            </div>
          }
          triggerStyle={triggerStyle}
        >
          <p className="accordion-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo iste
            quod necessitatibus commodi similique fuga temporibus aliquid
            explicabo ipsam quo? Facere aperiam unde quasi? Porro praesentium
            non quibusdam laudantium sapiente!
          </p>
        </Collapsible>
        <Collapsible
          trigger={
            <div className="trigger-wrapper">
              <p>How do I become a subscriber?</p>
              <img src={add_icon} alt="" />
            </div>
          }
          triggerStyle={triggerStyle}
        >
          <p className="accordion-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo iste
            quod necessitatibus commodi similique fuga temporibus aliquid
            explicabo ipsam quo? Facere aperiam unde quasi? Porro praesentium
            non quibusdam laudantium sapiente!
          </p>
        </Collapsible>
        <Collapsible
          trigger={
            <div className="trigger-wrapper">
              <p>Who can I contact for more detailed inquiries?</p>
              <img src={add_icon} alt="" />
            </div>
          }
          triggerStyle={triggerStyle}
        >
          <p className="accordion-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo iste
            quod necessitatibus commodi similique fuga temporibus aliquid
            explicabo ipsam quo? Facere aperiam unde quasi? Porro praesentium
            non quibusdam laudantium sapiente!
          </p>
        </Collapsible>
        <Collapsible
          trigger={
            <div className="trigger-wrapper">
              <p>Can I see more photos or a virtual tour of a property?</p>
              <img src={add_icon} alt="" />
            </div>
          }
          triggerStyle={triggerStyle}
        >
          <p className="accordion-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo iste
            quod necessitatibus commodi similique fuga temporibus aliquid
            explicabo ipsam quo? Facere aperiam unde quasi? Porro praesentium
            non quibusdam laudantium sapiente!
          </p>
        </Collapsible>
      </div>
    </QnaStyle>
  );
};

export default QnA;

const QnaStyle = styled.div`
  padding: 90px 112px;

  .heading {
    text-align: center;
    margin-bottom: 90px;
    h3 {
      font-weight: 500;
      font-size: 48px;
      letter-spacing: 0.001em;
      color: #192861;
    }

    p {
      font-weight: 400;
      font-size: 20px;
      line-height: 40px;
      letter-spacing: 0.001em;
      color: #192861;
    }
  }

  .accordion-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 90px;
    row-gap: 10px;
    .trigger-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0px;
      border-bottom: 1px solid #eaecf0;

      p {
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 36px;
        letter-spacing: 0.001em;
        color: #192861;
      }
    }

    .accordion-content {
      padding: 10px 0px;
      font-weight: 400;
      font-size: 18px;
      color: #192861;
    }
    .trigger-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0px;
      border-bottom: 1px solid #eaecf0;

      p {
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 36px;
        letter-spacing: 0.001em;
        color: #192861;
      }
    }

    .accordion-content {
      padding: 10px 0px;
      font-weight: 400;
      font-size: 18px;
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 20px;
    .heading {
      text-align: center;
      margin-bottom: 90px;

      h3 {
        font-weight: 500;
        font-size: 30px;
      }

      p {
        font-weight: 400;
        font-size: 20px;
        line-height: 40px;
        letter-spacing: 0.001em;
        color: #192861;
      }
    }

    .accordion-grid {
      grid-template-columns: 1fr;
    }
  }
`;
