const ModalOverlay = styled.div`
  position: absolute;
  right: 50px;
  top: 80px;
  background-color: #191a1a;
  border-radius: 12px;
  border: 1px solid rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  // z-index: 100;
  width: 400px;
  @media (max-width: 510px) {
    right: 10px;
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
// ... (other imports and styled components)

State.init({
  name: "",
  description: "",
  questions: [
    "How would you recognize someone from your borough?",
    "What's a popular dish in your borough?",
    "Name a famous landmark in your borough.",
  ],
  currentQuestionIndex: 0,
  answers: {},
});

function shuffleQuestion() {
  const randomIndex = Math.floor(Math.random() * state.questions.length);
  State.update({ currentQuestionIndex: randomIndex });
}

const handleAnswerChange = (value) => {
  const currentQuestion = state.questions[state.currentQuestionIndex];
  State.update({
    answers: {
      ...state.answers,
      [currentQuestion]: value,
    },
  });
};

const saveMyProfile = () => {
  const data = {
    name: state.name,
    description: state.description,
    answers: state.answers,
  };

  Social.set({
    thing: {
      libertyMarkerTest: {
        "": JSON.stringify(data),
      },
    },
  });
};

return (
  <ModalOverlay>
    <ModalContent>
      <ModalTitle>What's your Borough?</ModalTitle>
      <div>
        <Label>Name it!</Label>
        <Input onChange={(v) => State.update({ name: v.target.value })} />
      </div>
      <div>
        <Label>Describe it!</Label>
        <Input
          onChange={(v) =>
            State.update({
              description: v.target.value,
            })
          }
        />
      </div>
      <div>
        <Label>
          {state.questions[state.currentQuestionIndex]}
          <Button onClick={shuffleQuestion}>Shuffle</Button>
        </Label>
        <textarea
          onChange={(e) => handleAnswerChange(e.target.value)}
          value={
            state.answers[state.questions[state.currentQuestionIndex]] || ""
          }
        ></textarea>
      </div>
      <div>
        <SaveButton onClick={saveMyProfile}>Save</SaveButton>
      </div>
    </ModalContent>
  </ModalOverlay>
);
