const widgets = {
  header: "hack.near/widget/NDC.WG.Header",
  card: "hack.near/widget/NDC.WG.Card",
  about: "hack.near/widget/NDC.WG.About",
  styledComponents: "hack.near/widget/NDC.StyledComponents",
  participate: "hack.near/widget/NDC.Participate",
  compose: "hack.near/widget/NDC.WG.Create",
  deleteGroup: "hack.near/widget/NDC.WG.Delete",
};

const groups = Social.get(`hack.near/thing/directory`);

if (!groups) {
  return "";
}

const groupArray = JSON.parse(groups);

const Header = styled.div`
  background: black;
`;

const Container = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ActivityContainer = styled.div`
  overflow-y: scroll;
`;

const Left = styled.div`
  padding: 20px;
  background: #f8f8f9;
  flex: 3;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 9;
  padding: 0 20px;
`;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 20px 0;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

return (
  <Container>
    <Left>
      <H5>Learning Together</H5>
      <Widget src={widgets.about} />
      <div style={{ marginTop: "50px" }}>
        {state.sbt && (
          <Widget
            src={widgets.participate}
            props={{
              title: "Use Your Voice!",
              small: true,
            }}
          />
        )}
      </div>
    </Left>
    <Center>
      <Title>NDC Work Groups</Title>
      <CardWrapper>
        {groupArray.map((group, i) => (
          <Widget
            key={i}
            src={widgets.card}
            props={{
              groupId: group,
            }}
          />
        ))}
      </CardWrapper>
    </Center>
  </Container>
);
