const Container = styled.div`
  height: 100vh;
  margin-top: var(--header-height);
  background-color: var(--light-color);
`;

const Footer = styled.div`
  height: 400px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

return (
  <Container className="row">
    <div className="col">
      <Widget src="libertydao.near/widget/supporting.resources" />
    </div>
    <div className="col">
      <Widget src="libertydao.near/widget/supporting.proposal" />
    </div>
  </Container>
);
