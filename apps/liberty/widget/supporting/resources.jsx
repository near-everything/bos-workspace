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
  padding: 8px;
  background-color: var(--secondary-color);
`;

const TopBanner = styled.div`
  background-color: var(--secondary-color);
  padding: 20px;
  text-align: center;
  font-size: 16px;
`;


const CardContainer = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 250px; // Set a fixed width for all cards
  height: 350px; // Set a fixed height for all cards
  cursor: pointer;
  transition: transform 0.2s;
  background-color: var(--light-color);
  background-image: url(${props => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff; // White color for better visibility on images
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); // Shadow for better readability
`;

function Card({ title, img, link }) {
  return (
    <CardContainer href={link} img={img} target="_blank" rel="noopener noreferrer">
      <Title>{title}</Title>
    </CardContainer>
  );
}

const data = [
  {
    title: "Banyan Collective",
    img: "path/to/banyan-collective-img.jpg", // Placeholder until we get the actual image
    link: "https://www.banyan.gg/"
  },
  {
    title: "Shard Dog",
    img: "path/to/shard-dog-img.jpg", // Placeholder
    link: "https://shard.dog/"
  },
  {
    title: "everything",
    img: "path/to/everything-img.jpg", // Placeholder
    link: "https://everything.dev"
  },
  {
    title: "Lynkable",
    img: "path/to/lynkable-img.jpg", // Placeholder
    link: "https://lynkable.near.social/"
  },
  {
    title: "NEAR NYC",
    img: "path/to/near-nyc-img.jpg", // Placeholder
    link: "https://near.org/nyc"
  },
  {
    title: "Republic Crypto",
    img: "path/to/republic-crypto-img.jpg", // Placeholder
    link: "https://republiccrypto.com/"
  },
  {
    title: "Techquity Labs",
    img: "path/to/techquitylabs-img.jpg", // Placeholder
    link: "https://techquitylabs.io/"
  },
  {
    title: "Sparx Labs",
    img: "path/to/sparxlabs-img.jpg", // Placeholder
    link: "https://www.sparxlabs.io/"
  },
  {
    title: "Blue Collar Blockchain",
    img: "path/to/blue-collar-blockchain-img.jpg", // Placeholder
    link: "https://bc2bc.org/"
  }
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
      <p>
       Support doesn't just flow from us; it flows through us. Below you will find an interactive catalog of organizations that believe in supporting people like you.
      </p>
    </TopBanner>
    <Grid>
      {data.map((it) => (
        <Card key={index} {...it} />
      ))}
    </Grid>
  </Container>
);