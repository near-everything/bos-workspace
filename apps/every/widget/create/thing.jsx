const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const Box = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin: 5px;
`;

function RecursiveBox({ data, updateData, parentKey, removeBox }) {
  const handleClickAdd = () => {
    updateData({
      ...data,
      [Date.now()]: {},
    });
  };

  const handleClickRemove = () => {
    removeBox(parentKey);
  };

  return (
    <Box>
      {Object.keys(data).map((key) => (
        <RecursiveBox
          key={key}
          data={data[key]}
          updateData={(newData) => updateData({ ...data, [key]: newData })}
          parentKey={key}
          removeBox={(keyToRemove) => {
            const newData = { ...data };
            delete newData[keyToRemove];
            updateData(newData);
          }}
        />
      ))}
      <button onClick={handleClickAdd}>Add Box</button>
      {parentKey && <button onClick={handleClickRemove}>Remove</button>}
    </Box>
  );
}

State.init({
  thing: {
    box1: {},
    box2: {},
    box3: {},
    box4: {},
  },
});

function setThing(newData) {
  State.update({ thing: newData });
}

return (
  <Container>
    <RecursiveBox data={state.thing} updateData={setThing} />
    <pre>{JSON.stringify(state.thing, null, 2)}</pre>
  </Container>
);
