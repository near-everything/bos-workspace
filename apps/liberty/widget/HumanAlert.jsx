const { onClose } = props;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ModalOverlay = styled.div`
  background-color: #191a1a;
  border-radius: 12px;
  border: 1px solid rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  width: 464px;
  position: relative;
  padding: 40px;
  @media (max-width: 510px) {
    width: 90%;
  }
`;

const ModalContent = styled.div`
  width: 100%;
  color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalAction = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const ModalTitle = styled.h4`
  margin-bottom: 10px;
  text-align: center;
`;

const Button = styled.a`
  padding: 10px 22px;
  background-color: white;
  text-decoration: none !important;
  color: #191a1a;
  border-radius: 6px;
  &:hover {
    background-color: grey;
    color: #191a1a;
  }
  &:active {
    background-color: grey;
    color: #191a1a;
  }
`;

return (
  <ModalContainer>
    <ModalOverlay>
      <ModalContent>
        <button
          style={{
            position: "absolute",
            right: 15,
            top: 15,
            background: "unset",
            border: 0,
          }}
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm3.59-13L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41z"
            />
          </svg>
        </button>
        <ModalTitle>{`505: Human not found!`}</ModalTitle>
        <p>{`Looks like you haven't signed up for I Am Human. Use the wallet that you used for IAM Human Verification, or use the following link to verify your personhood:`}</p>
      </ModalContent>
      <ModalAction>
        <Button
          href="https://i-am-human.app/?community=rocketbois&vertical=nft"
          target="_blank"
          className="btn"
        >{`I-AM-Human Verification`}</Button>
      </ModalAction>
    </ModalOverlay>
  </ModalContainer>
);
