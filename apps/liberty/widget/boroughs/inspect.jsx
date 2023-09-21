const focusedMarker = props.focusedMarker;
const { accountId, coordinates, data } = focusedMarker;
const questions = props.questions;


const ModalOverlay = styled.div`
  position: absolute;
  left: 50px;
  top: 80px;
  background-color: #191a1a;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  // z-index: 100;
  width: 400px;
  @media (max-width: 510px) {
    left: 10px;
    top: 54px;
    width: 96%;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  width: 100%;
  color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ModalTitle = styled.h4`
  margin-bottom: 10px;
`;

const Input = styled.input`
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.8);
  min-height: 46px;
  color: #fff;
  font-size: 14px;
  border-radius: 1000px;
  width: 100%;
  padding: 0px 11px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  color: #fff;
  font-size: 16px;
  position: relative;
  padding-right: 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  padding: 5px 16px;
  font-weight: 400;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  height: 40px;
  border-radius: 40px;
  line-height: 29px;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
`;

const SaveButton = styled.button`
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  padding: 5px 16px;
  font-weight: 400;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  height: 40px;
  border-radius: 40px;
  line-height: 29px;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;

  background-image: linear-gradient(145deg, #016eda, #6c1ecf, #016eda, #6c1ecf);
  width: 100%;
  margin-left: auto;
  padding: 5px 20px;
  text-align: center;
`;

const Question = styled.div`
  font-weight: bold;
`;

const Answer = styled.div`
  margin-left: 20px;
`;

return (
  <ModalOverlay>
    <ModalContent>
      <Widget src="mob.near/widget/Profile" props={{ accountId: accountId }} />
      <p>Name: {data.name}</p>
      <p>Description: {data.description}</p>
      <h2>Answers:</h2>
      {data.answers && Object.entries(data.answers).map(([key, value]) => (
        <div key={key}>
           <Question>{questions[key] && questions[key].value}: </Question>
          <Answer>{value}</Answer>
        </div>
      ))}
    </ModalContent>
  </ModalOverlay>
);
