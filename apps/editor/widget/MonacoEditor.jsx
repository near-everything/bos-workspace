const path = props.path;
const code = props.code;
const language = props.language;
const onChange = props.onChange;

const height = props.height;
const Container = styled.div`
  height: ${height ? height : "100vh"};
`;

return (
  <Container>
    <MonacoEditor
      path={path}
      language={language}
      value={code}
      onChange={onChange}
    />
  </Container>
);
