const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
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

function Card({ title, description, id }) {
  return (
    <CardContainer
      onClick={() => State.update({ showPage: true, thingId: id })}
    >
      <Title>{title}</Title>
      <Description>{description}</Description>
    </CardContainer>
  );
}

const data = [
  {
    id: "be5d6bdc-2d23-ed6d-b485-0ed561771b20",
    title: "Pass the Torch",
    description:
      "Developing new and more meaningful ways of inviting high value humans into support communities",
  },
  {
    id: "",
    title: "Liberty Turnpike",
    description:
      "The universal onramp where all roads lead to someplace personally meaningful",
  },
  {
    id: "",
    title: "Citizens Data",
    description:
      "Activating, Enriching, and Connecting our access to insights through shared data and information",
  },
  {
    id: "",
    title: "Ignite the Future",
    description:
      "Inspiring the creators of tomorrow to step up and carry the flame to new possibilities",
  },
  {
    id: "",
    title: "Digital Gardening",
    description:
      "Cultivating our portals to digital futures. Helping each other develop a rich presence on BOS, growing meaningful use as BOS grows.",
  },
  {
    id: "",
    title: "Liberty Academy",
    description:
      "Sharing, Learning, Building the skills to set the future free. From html, to JS3.",
  },
];

return (
  <Container>
    <Header>Active Projects</Header>
    {state.showPage ? (
      <div>
        <button onClick={() => State.update({ showPage: false })}>back</button>
        <Widget
          src={"libertydao.near/widget/projects.page"}
          props={{
            thingId: state.thingId,
          }}
        />
      </div>
    ) : (
      <Grid>
        {data.map((it) => (
          <Card key={index} {...it} />
        ))}
      </Grid>
    )}
  </Container>
);
