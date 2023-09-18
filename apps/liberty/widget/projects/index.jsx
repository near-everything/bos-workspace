const Container = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
`;

const Selector = styled.div``;

const Left = styled.div`
  padding: 20px;
  background: #f8f8f9;
  overflow-y: scroll;
  flex: 3;
`;

const Center = styled.div`
  flex: 9;
  padding: 0 20px;
  display: flex;
  justify-contet: center;
  background-color: ${(p) => p.color};
`;

const Card = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
  background-color: ${(p) => p.color};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
`;

const Preview = styled.div`
  width: 100%;
  margin: 40px 40px 0 40px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
`;

const dummyData = [
  {
    id: 1,
    title: "Igniting Futures",
    color: "#FF5733",
    content: "Vibrant and fiery, this color evokes passion and energy.",
  },
  {
    id: 2,
    title: "Data Citizens",
    color: "#33FF57",
    content: "Refreshing and lively, this shade reminds us of spring meadows.",
  },
  {
    id: 3,
    title: "Digital Gardening",
    color: "#3357FF",
    content: "Deep and tranquil, this hue is reminiscent of the vast ocean.",
  },
  {
    id: "NEW",
    title: "Create a Proposal",
    color: "#A833FF",
    content: "Mysterious and intriguing, this shade is for the dreamers.",
  },
];

State.init({
  selected: dummyData[props.projectId || 0],
});

return (
  <Container>
    <Left>
      {dummyData.map((item) => (
        <Card
          key={item.id}
          color={item.color}
          onClick={() => State.update({ selected: item })}
        >
          {item.title}
        </Card>
      ))}
    </Left>
    <Center color={state.selected.color}>
      <Preview>
        <h1>{state.selected.title}</h1>
        {state.selected.id === "NEW" ? (
          <div className="d-flex flex-column gap-2">
            <Widget
              src="nearui.near/widget/Input.Text"
              props={{
                textarea: true,
                size: "lg",
                label: "What?",
              }}
            />
            <Widget
              src="nearui.near/widget/Input.Text"
              props={{
                textarea: true,
                size: "lg",
                label: "Why?",
              }}
            />
            <Widget
              src="nearui.near/widget/Input.Text"
              props={{
                textarea: true,
                size: "lg",
                label: "When?",
              }}
            />
            <Widget
              src="nearui.near/widget/Input.Text"
              props={{
                textarea: true,
                size: "lg",
                label: "With who?",
              }}
            />
          </div>
        ) : (
          <p>{state.selected.content}</p> // TODO: SocialMarkdown
        )}
      </Preview>
    </Center>
  </Container>
);
