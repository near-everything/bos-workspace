const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Side = styled.div`
  flex: 1;
`;

const Tile = styled.div`
  padding: 20px;
  height: 50%;
  border: 1px solid #ccc;
`;

State.init({
  uidl: "{}",
  code: "",
});

const EditorContainer = styled.div`
  height: 100%;
  overflow: auto;
`;

function handleGenerate() {
  // State.update({ code: state.uidl });
  State.update({ code: "return <p>hello world</p>;" });
}

let timeoutId;

const debounce = (func, delay) => {
  if (!delay) {
    delay = 300;
  }
  clearTimeout(timeoutId);
  timeoutId = setTimeout(func, delay);
};

return (
  <Container>
    <Side>
      <Tile>
        <h1>Teleport UIDL</h1>
        <EditorContainer>
          <Widget
            key={"left"}
            src="efiz.near/widget/MonacoEditor"
            props={{
              language: "json",
              path: "left",
              code: state.uidl,
              onChange: debounce((v) => State.update({ uidl: v })),
              height: "80%",
            }}
          />
        </EditorContainer>
      </Tile>
      <Tile>
        <h1>Control Panel</h1>
        <button onClick={handleGenerate}>Generate</button>
      </Tile>
    </Side>
    <Side>
      <Tile>
        <h1>Generated Code</h1>
        <Widget
          src="efiz.near/widget/MonacoEditor"
          props={{
            language: "javascript",
            path: "right",
            code: state.code,
            height: "80%",
          }}
        />
      </Tile>
      <Tile>
        <h1>Rendered Code</h1>
        {state.code && <Widget code={state.code} />}
      </Tile>
    </Side>
  </Container>
);
