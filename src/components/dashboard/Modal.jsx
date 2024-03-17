import { forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";

import Close from "../../assets/common/cancel.svg";

// import loader from "../../assets/common/loader_red_dots.svg";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({
  children,
  isFullWidth,
  maxWidth,
  modalOpenCondition,
  headerPrimaryText,
  headerSecondaryText,
  handleClose,
}) {
  return (
    <div>
      <Dialog
        open={modalOpenCondition}
        onClose={!modalOpenCondition}
        // TransitionComponent={Transition}
        // keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth={isFullWidth}
        maxWidth={maxWidth}
      >
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <div>
              <h4>{headerPrimaryText}</h4>
              <p>{headerSecondaryText}</p>
            </div>
            <img src={Close} alt="close" onClick={handleClose} />
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContainer>
      </Dialog>
    </div>
  );
}

const ModalContainer = styled.div`
  /* width: 60vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  /* width: 600px; */
`;

const ModalHeader = styled.div`
  width: 100%;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 20px;
  box-sizing: border-box;

  h4 {
    color: #192861;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.02px;
  }

  p {
    margin: 0px;
    color: #192861;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px; /* 150% */
  }

  img {
    cursor: pointer;
    margin-top: 4px;
  }
`;

const ModalBody = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0px auto;

  .input-container {
    width: 100%;
    margin: 32px auto;
  }

  h4 {
    color: #6976a1;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.02px;
    margin-bottom: 30px;
  }
`;
