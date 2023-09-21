const Container = styled.div`
  height: auto;
  margin-top: var(--header-height);
  padding-bottom: var(--header-height);
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
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

const Separator = styled.div`
  height: 20px;
`;

return (
  <Container>
    <Widget src="libertydao.near/widget/supporting.resources" />
    <Separator />
    <Widget src="libertydao.near/widget/supporting.proposal" />
  </Container>
);
