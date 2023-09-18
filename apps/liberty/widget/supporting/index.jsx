const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
`;

const TopBanner = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  font-size: 24px;
`;

const ResourceNetworkContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ResourceHeader = styled.div`
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
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

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
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
    { name: "Funnel A", description: "This is a description for Funnel A.", location: "New York", members: 120 },
    { name: "Funnel B", description: "This is a description for Funnel B.", location: "Los Angeles", members: 85 },
    { name: "Funnel C", description: "This is a description for Funnel C.", location: "Chicago", members: 95 }
  ],
  daos: [
    { name: "DAO Alpha", description: "Description for DAO Alpha.", location: "San Francisco", members: 300 },
    { name: "DAO Beta", description: "Description for DAO Beta.", location: "Boston", members: 250 },
    { name: "DAO Gamma", description: "Description for DAO Gamma.", location: "Seattle", members: 180 }
  ],
  "web3 orgs": [
    { name: "Org X", description: "Description for Org X.", location: "Miami", members: 220 },
    { name: "Org Y", description: "Description for Org Y.", location: "Dallas", members: 210 },
    { name: "Org Z", description: "Description for Org Z.", location: "Denver", members: 190 }
  ],
  institutions: [
    { name: "Institution One", description: "Description for Institution One.", location: "Atlanta", members: 500 },
    { name: "Institution Two", description: "Description for Institution Two.", location: "Houston", members: 480 },
    { name: "Institution Three", description: "Description for Institution Three.", location: "Phoenix", members: 460 }
  ],
};

State.init({
  activeTab: "opportunity funnels",
});

function setActiveTab(key) {
  State.update({
    activeTab: key,
  });
}

return (
  <MainContainer>
    <TopBanner>Connecting Resources to those that need them</TopBanner>
    <ResourceNetworkContainer>
      <ResourceHeader>Resource Network</ResourceHeader>
      <Navbar>
        {Object.keys(dummyData).map((key) => (
          <button onClick={() => setActiveTab(key)}>{key}</button>
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
                  <PreviewDescription>
                    {item.description}
                  </PreviewDescription>
                  <PreviewInfo>Location: {item.location}</PreviewInfo>
                  <PreviewInfo>Members: {item.members}</PreviewInfo>
                </PreviewContainer>
              ),
            }}
          />
        ))}
      </Grid>
    </ResourceNetworkContainer>
    <Footer>
      <h2>What would you reach for?</h2>
      <p>Reach for the stars in our torchbearer program!</p>
      <a href="#">
        See something missing? Awesome! Offer network suggestions Here.
      </a>
    </Footer>
  </MainContainer>
);
