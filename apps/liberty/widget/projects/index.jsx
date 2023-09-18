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
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 9;
  padding: 0 20px;
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

const dummyData = [
  {
    id: 1,
    color: "#FF5733",
    content: "Vibrant and fiery, this color evokes passion and energy.",
  },
  {
    id: 2,
    color: "#33FF57",
    content: "Refreshing and lively, this shade reminds us of spring meadows.",
  },
  {
    id: 3,
    color: "#3357FF",
    content: "Deep and tranquil, this hue is reminiscent of the vast ocean.",
  },
  {
    id: 4,
    color: "#FF33A1",
    content: "Bold and playful, this color is a nod to modern pop culture.",
  },
  {
    id: 5,
    color: "#A833FF",
    content: "Mysterious and intriguing, this shade is for the dreamers.",
  },
];

State.init({
  selected: dummyData[0],
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
          {item.id}
        </Card>
      ))}
    </Left>
    <Center>
      <h1>Preview</h1>
      <p>{state.selected.content}</p>
    </Center>
  </Container>
);
