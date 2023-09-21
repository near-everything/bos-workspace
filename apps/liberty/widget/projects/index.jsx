const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  margin-top: var(--header-height);
  background-color: var(--light-color);
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  font-size: 28px;
  background-color: var(--secondary-color);
  padding: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 48px;
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

function Card({ title, description }) {
  return (
    <CardContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </CardContainer>
  );
}

const data = [
  {
    title: "Pass the Torch",
    description:
      "Developing new and more meaningful ways of inviting high value humans into support communities.",
  },
  {
    title: "Liberty Turnpike",
    description:
      "The universal onramp where all roads lead to someplace personally meaningful.",
  },
  {
    title: "Data Citizens",
    description: "Igniting change one data point at a time.",
  },
  {
    title: "Ignite the Future",
    description:
      "Inspiring the creators of tomorrow to step up and carry the flame to new possibilities.",
  },
  {
    title: "Digital Gardening",
    description:
      "Cultivating our portals to digital futures. Helping each other develop a rich presence on BOS, growing meaningful use as BOS grows.",
  },
  {
    title: "Liberty Academy",
    description:
      "Sharing, Learning, Building the skills to set the future free. From html, to JS3.",
  },
];

return (
  <Container>
    <Header>Active Projects</Header>
    <Grid>
      {data.map((it) => (
        <Card key={index} {...it} />
      ))}
    </Grid>
  </Container>
);

// const Container = styled.div`
//   margin: 0;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   width: 100%;
//   height: 100vh;
// `;

// const Selector = styled.div``;

// const Left = styled.div`
//   padding: 20px;
//   background: #f8f8f9;
//   overflow-y: scroll;
//   flex: 3;
// `;

// const Center = styled.div`
//   flex: 9;
//   padding: 0 20px;
//   display: flex;
//   justify-contet: center;
//   background-color: ${(p) => p.color};
// `;

// const Card = styled.div`
//   width: 100%;
//   height: 300px;
//   margin-bottom: 20px;
//   background-color: ${(p) => p.color};
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 16px;
//   color: white;
// `;

// const Preview = styled.div`
//   width: 100%;
//   margin: 40px 40px 0 40px;
//   background-color: #fff;
//   border-radius: 10px;
//   padding: 10px;
// `;

// const dummyData = [
//   {
//     id: 1,
//     title: "Igniting Futures",
//     color: "#FF5733",
//     content: "Vibrant and fiery, this color evokes passion and energy.",
//   },
//   {
//     id: 2,
//     title: "Data Citizens",
//     color: "#33FF57",
//     content: "Refreshing and lively, this shade reminds us of spring meadows.",
//   },
//   {
//     id: 3,
//     title: "Digital Gardening",
//     color: "#3357FF",
//     content: "Deep and tranquil, this hue is reminiscent of the vast ocean.",
//   },
//   {
//     id: "NEW",
//     title: "Create a Proposal",
//     color: "#A833FF",
//     content: "Mysterious and intriguing, this shade is for the dreamers.",
//   },
// ];

// State.init({
//   selected: dummyData[props.projectId || 0],
// });

// return (
//   <Container>
//     <Left>
//       {dummyData.map((item) => (
//         <Card
//           key={item.id}
//           color={item.color}
//           onClick={() => State.update({ selected: item })}
//         >
//           {item.title}
//         </Card>
//       ))}
//     </Left>
//     <Center color={state.selected.color}>
//       <Preview>
//         <h1>{state.selected.title}</h1>
//         {state.selected.id === "NEW" ? (
//           <div className="d-flex flex-column gap-2">
//             <Widget
//               src="nearui.near/widget/Input.Text"
//               props={{
//                 textarea: true,
//                 size: "lg",
//                 label: "What?",
//               }}
//             />
//             <Widget
//               src="nearui.near/widget/Input.Text"
//               props={{
//                 textarea: true,
//                 size: "lg",
//                 label: "Why?",
//               }}
//             />
//             <Widget
//               src="nearui.near/widget/Input.Text"
//               props={{
//                 textarea: true,
//                 size: "lg",
//                 label: "When?",
//               }}
//             />
//             <Widget
//               src="nearui.near/widget/Input.Text"
//               props={{
//                 textarea: true,
//                 size: "lg",
//                 label: "With who?",
//               }}
//             />
//           </div>
//         ) : (
//           <p>{state.selected.content}</p> // TODO: SocialMarkdown
//         )}
//       </Preview>
//     </Center>
//   </Container>
// );
