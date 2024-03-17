import styled from "styled-components";

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 24px;

  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export { CardsWrapper };
