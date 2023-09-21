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
  font-weight: bold;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  background-color: var(--secondary-color);
`;

const TopBanner = styled.div`
  background-color: var(--secondary-color);
  padding: 20px;
  text-align: center;
  font-size: 16px;
`;


const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  cursor: pointer;
  transition: transform 0.2s;
  background-color: var(--light-color);

  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  text-align: center;
`;

function Card({ title, img }) {
  return (
    <CardContainer>
      <Title>{title}</Title>
    </CardContainer>
  );
}

const data = [
  {
    title: "Banyan Collective",
    img: "path/to/banyan-collective-img.jpg",
  },
  {
    title: "Shard Dog",
    img: "path/to/shard-dog-img.jpg",
  },
  {
    title: "everything",
    img: "path/to/everything-img.jpg",
  },
  {
    title: "Lynkable",
    img: "path/to/lynkable-img.jpg",
  },
  {
    title: "NEAR NYC",
    img: "path/to/near-nyc-img.jpg",
  },
  {
    title: "Republic Crypto",
    img: "path/to/republic-crypto-img.jpg",
  },
];

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
    <Grid>
      {data.map((it) => (
        <Card key={index} {...it} />
      ))}
    </Grid>
  </Container>
);