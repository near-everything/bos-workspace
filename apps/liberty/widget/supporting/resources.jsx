const data = [
  {
    title: "Banyan Collective",
    img: "https://uploads-ssl.webflow.com/63b3350a8d515011bfbff918/63b3350a8d51500805bffa62_BANYANWHITE%20(1).svg",
    link: "https://www.banyan.gg/",
  },
  {
    title: "Shard Dog",
    img: "https://my.shard.dog/_next/image?url=%2Fimages%2FShardDogLogo.png&w=96&q=75",
    link: "https://shard.dog/",
  },
  {
    title: "everything",
    img: "https://i.near.social/magic/large/https://near.social/magic/img/account/every.near",
    link: "https://everything.dev",
  },
  {
    title: "Lynkable",
    img: "https://ipfs.near.social/ipfs/bafkreiakn6qoxvhht2a6tgoz5ulvtbrzug3fpvo3lh3co524jumud3m3je",
    link: "https://lynkable.near.social/",
  },
  {
    title: "NEAR NYC",
    img: "https://pages.near.org/wp-content/uploads/2021/12/near-nyc.jpg",
    link: "https://near.org/nyc",
  },
  {
    title: "Republic Crypto",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Republic.co_company_logo_2017.png/440px-Republic.co_company_logo_2017.png",
    link: "https://republiccrypto.com/",
  },
  {
    title: "Techquity Labs",
    img: "https://techquitylabs.io/images/0faaef84219ea41176049f8fbf442bed.png",
    link: "https://techquitylabs.io/",
  },
  {
    title: "Sparx Labs",
    img: "https://images.squarespace-cdn.com/content/v1/63f29ca803709059039dc7a6/6c3a0b29-d38d-4c13-ae95-bf1b08bdf355/Sparx-White.png?format=1500w",
    link: "https://www.sparxlabs.io/",
  },
  {
    title: "Blue Collar Blockchain",
    img: "https://i0.wp.com/bc2bc.org/wp-content/uploads/2023/05/cropped-cir.png?w=500&ssl=1",
    link: "https://bc2bc.org/",
  },
];

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--light-color);
  flex: 1;
  display: flex;
  flex-direction: column;
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
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 0.1fr));
  gap: 8px;
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
  width: 300px;
  height: 200px;
  cursor: pointer;
  transition: transform 0.2s;
  background-color: var(--dark-color);
  position: relative; // Added for positioning the title over the image

  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 90;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 7px;
  position: absolute;
  top: 0;
  left: 0;
`;

function Card({ title, img, link }) {
  return (
    <CardContainer href={link} target="_blank" rel="noopener noreferrer">
      <CardImage src={img} alt={title} />
      <Title>{title}</Title>
    </CardContainer>
  );
}

return (
  <Container className="row">
    <div className="col">
      <Header>Resource Network</Header>
      <TopBanner>
        <p>
          Liberty doesn't come without a cost. We're here to help with that.
        </p>
        <p>
          People, skills, time, partners, investors, opportunities, futures,
          teams — everything comes through the right connections. And we're
          working on those.
        </p>
        <p>
          Support doesn't just flow from us; it flows through us. Below you will
          find an interactive catalog of organizations that believe in
          supporting people like you.
        </p>
      </TopBanner>
      <Grid>
        {data.map((it) => (
          <Card key={index} {...it} />
        ))}
      </Grid>
    </div>
  </Container>
);
