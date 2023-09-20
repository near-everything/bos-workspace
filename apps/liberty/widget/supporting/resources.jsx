const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--light-color);
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 28px;
  background-color: var(--secondary-color);
  height: 48px;
  padding: 8px;
  text-decoration: underline;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
`;

const CardTitle = styled.h4`
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
`;

const CardInfo = styled.div`
  font-size: 12px;
  color: #888;
`;

const PreviewContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  background-color: #fff;
`;

const PreviewTitle = styled.h3`
  margin-bottom: 15px;
`;

const PreviewDescription = styled.p`
  margin-bottom: 15px;
`;

const PreviewInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

const dummyData = {
  "opportunity funnels": [
    {
      name: "Funnel A",
      description: "This is a description for Funnel A.",
      location: "New York",
      members: 120,
    },
    {
      name: "Funnel B",
      description: "This is a description for Funnel B.",
      location: "Los Angeles",
      members: 85,
    },
    {
      name: "Funnel C",
      description: "This is a description for Funnel C.",
      location: "Chicago",
      members: 95,
    },
  ],
  daos: [
    {
      name: "DAO Alpha",
      description: "Description for DAO Alpha.",
      location: "San Francisco",
      members: 300,
    },
    {
      name: "DAO Beta",
      description: "Description for DAO Beta.",
      location: "Boston",
      members: 250,
    },
    {
      name: "DAO Gamma",
      description: "Description for DAO Gamma.",
      location: "Seattle",
      members: 180,
    },
  ],
  "web3 orgs": [
    {
      name: "Org X",
      description: "Description for Org X.",
      location: "Miami",
      members: 220,
    },
    {
      name: "Org Y",
      description: "Description for Org Y.",
      location: "Dallas",
      members: 210,
    },
    {
      name: "Org Z",
      description: "Description for Org Z.",
      location: "Denver",
      members: 190,
    },
  ],
  institutions: [
    {
      name: "Institution One",
      description: "Description for Institution One.",
      location: "Atlanta",
      members: 500,
    },
    {
      name: "Institution Two",
      description: "Description for Institution Two.",
      location: "Houston",
      members: 480,
    },
    {
      name: "Institution Three",
      description: "Description for Institution Three.",
      location: "Phoenix",
      members: 460,
    },
  ],
};

const Tabs = styled.div`
  display: flex;
  height: 48px;
  margin: 12px 12px 0 0;
  border-bottom: 1px solid #eceef0;
  overflow: auto;
  scroll-behavior: smooth;
  cursor: pointer;

  @media (max-width: 1200px) {
    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 24px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;
  &:hover {
    color: #11181c;
  }
  cursor: pointer;

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(89.97deg, #ae67fa 1.84%, #f49867 102.67%);
  }
`;

const TopBanner = styled.div`
  background-color: var(--secondary-color);
  padding: 20px;
  text-align: center;
  font-size: 16px;
`;

State.init({
  activeTab: "opportunity funnels",
});

function setActiveTab(key) {
  State.update({
    activeTab: key,
  });
}

return (
  <Container>
    <Header>Resource Network</Header>
    <TopBanner>
      <p>Liberty doesn't come without a cost. We're here to help with that.</p>
      <p>
        People, skills, time, partners, investors, opportunities, futures, teams
        — everything comes through the right connections. And we're working on
        those.
      </p>
    </TopBanner>
    <Navbar>
      {Object.keys(dummyData).map((key) => (
        <TabsButton
          key={key}
          onClick={() => setActiveTab(key)}
          selected={state.selectedTab === t}
        >
          {key}
        </TabsButton>
      ))}
    </Navbar>
    <Grid>
      {dummyData[state.activeTab].map((item) => (
        <Widget
          src="nearui.near/widget/Layout.Modal"
          props={{
            toggle: (
              <Card key={index}>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
                <CardInfo>Location: {item.location}</CardInfo>
                <CardInfo>Members: {item.members}</CardInfo>
              </Card>
            ),
            content: (
              <PreviewContainer>
                <PreviewTitle>{item.name}</PreviewTitle>
                <PreviewDescription>{item.description}</PreviewDescription>
                <PreviewInfo>Location: {item.location}</PreviewInfo>
                <PreviewInfo>Members: {item.members}</PreviewInfo>
              </PreviewContainer>
            ),
          }}
        />
      ))}
    </Grid>
  </Container>
);
