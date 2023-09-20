const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin-top: var(--header-height);
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
  <Container>
    <Widget src="libertydao.near/widget/supporting.resources" />
    <Widget src="libertydao.near/widget/supporting.projects" />
    <Widget src="libertydao.near/widget/supporting.proposal" />
  </Container>
);
