const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Selector = styled.div`
  flex: 1;
  overflow-y: scroll;
  padding: 20px;
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
  flex: 3;
  padding: 20px;
  border-left: 1px solid #ccc;
`;

const dummyData = [
  { id: 1, color: "#FF5733", content: "Vibrant and fiery, this color evokes passion and energy." },
  { id: 2, color: "#33FF57", content: "Refreshing and lively, this shade reminds us of spring meadows." },
  { id: 3, color: "#3357FF", content: "Deep and tranquil, this hue is reminiscent of the vast ocean." },
  { id: 4, color: "#FF33A1", content: "Bold and playful, this color is a nod to modern pop culture." },
  { id: 5, color: "#A833FF", content: "Mysterious and intriguing, this shade is for the dreamers." },
];


State.init({
  selected: dummyData[0],
});

return (
  <Container>
    <Selector>
      {dummyData.map((item) => (
        <Card
          key={item.id}
          color={item.color}
          onClick={() => State.update({ selected: item })}
        >
          {item.id}
        </Card>
      ))}
    </Selector>
    <Preview>
      <h1>Preview</h1>
      <p>{state.selected.content}</p>
    </Preview>
  </Container>
);
