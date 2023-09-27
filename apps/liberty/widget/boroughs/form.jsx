const data = props.data;
const handleSave = props.handleSave || (() => {});
const questions = props.questions;

const ModalOverlay = styled.div`
  position: absolute;
  right: 50px;
  top: 80px;
  background-color: #191a1a;
  border-radius: 12px;
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
  width: 100%;
  padding: 0px 11px;
  margin-bottom: 10px;
`;
const Textarea = styled.textarea`
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.8);
  min-height: 120px;
  color: #fff;
  font-size: 14px;
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

  background-color: var(--primary-color);
  width: 100%;
  margin-left: auto;
  padding: 5px 20px;
  text-align: center;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuestionText = styled.span`
  flex-grow: 1;
  margin-right: 10px;
  white-space: normal;
  word-wrap: break-word;
`;

const ShuffleIcon = styled.span`
  cursor: pointer;
  flex-shrink: 0;
  background-color: var(--primary-color);
  padding: 5px 8px;
  border-radius: 10px;
`;

function getRandomIndex() {
  return Math.floor(Math.random() * questions.length);
}

State.init({
  name: data.name || "",
  description: data.description || "",
  currentQuestionIndex: getRandomIndex(),
  answers: data.answers || {},
});

function shuffleQuestion() {
  State.update({ currentQuestionIndex: getRandomIndex() });
}

const handleAnswerChange = (value) => {
  const currentQuestion = questions[state.currentQuestionIndex];
  State.update({
    answers: {
      ...state.answers,
      [currentQuestion.key]: value,
    },
  });
};

return (
  <ModalOverlay>
    <ModalContent>
      <ModalTitle>What's your Borough?</ModalTitle>
      <div>
        <Label>Name it!</Label>
        <Input
          value={state.name}
          onChange={(v) => State.update({ name: v.target.value })}
        />
      </div>
      <div>
        <Label>Describe it!</Label>
        <Input
          value={state.description}
          onChange={(v) =>
            State.update({
              description: v.target.value,
            })
          }
        />
      </div>
      <div>
        <Label>
          <FlexContainer>
            <QuestionText>
              {questions[state.currentQuestionIndex].value}
            </QuestionText>
            <ShuffleIcon onClick={shuffleQuestion}>
              <i className="bi bi-shuffle" />
            </ShuffleIcon>
          </FlexContainer>
        </Label>
        <Textarea
          onChange={(e) => handleAnswerChange(e.target.value)}
          value={state.answers[questions[state.currentQuestionIndex].key] || ""}
        ></Textarea>
      </div>
      <div>
        <SaveButton
          onClick={() =>
            handleSave({
              name: state.name,
              description: state.description,
              answers: state.answers,
            })
          }
        >
          Save
        </SaveButton>
      </div>
    </ModalContent>
  </ModalOverlay>
);
