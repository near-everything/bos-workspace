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
  code: "",
});

function init() {
  if (!state.uidl) {
    const val = Storage.privateGet("uidl");
    if (val) {
      State.update({
        uidl: val,
      });
    }
  }
}

init();

const EditorContainer = styled.div`
  height: 80%;
  overflow: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

function handleGenerate(v) {
  State.update(v);
}

let timeoutId;

const debounce = (func, delay) => {
  if (!delay) {
    delay = 300;
  }
  clearTimeout(timeoutId);
  timeoutId = setTimeout(func, delay);
};

const Button = styled.button``;

return (
  <Container>
    <Side>
      <Tile>
        <Header>
          <h1>Teleport UIDL</h1>
        </Header>
        <EditorContainer>
          <MonacoEditor
            key={"left"}
            path={"left"}
            language={"json"}
            defaultValue={state.uidl}
            onChange={(v) => debounce(() => Storage.privateSet("uidl", v))}
          />
        </EditorContainer>
      </Tile>
      <Tile>
        <h1>Control Panel</h1>
        <TeleportGenerator
          getUIDL={() => Storage.privateGet("uidl")}
          onGenerate={handleGenerate}
        />
      </Tile>
    </Side>
    <Side>
      <Tile>
        <h1>Generated Code</h1>
        <EditorContainer key={"right"}>
          <MonacoEditor
            key={"right"}
            path={"right"}
            language={"javascript"}
            value={state.code}
          />
        </EditorContainer>
      </Tile>
      <Tile>
        <h1>Rendered Code</h1>
        {state.code && <Widget code={state.code} />}
        {state.error && <pre>{state.error}</pre>}
      </Tile>
    </Side>
  </Container>
);
