const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--light-color);
  padding-bottom: 80px;
  padding: 40px;
  border-radius: 8px;
`;

const Title = styled.h1`
  color: #1b856b;
`;

const Subtitle = styled.h3`
  margin-top: 10px;
`;

const Header = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
`;

const FormLabel = styled.label`
  display: block;
  margin-top: 10px;
  font-weight: bold;
`;

const TextInput = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: var(--dark-color);
  margin-top: 20px;
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #e5e5e5;
    color: #111;
  }
`;

State.init({
  proposal: "",
  what: "",
  forWho: "",
  why: "",
  status: "",
  timeline: "",
  needs: "",
});

function handleSubmit() {
  Social.set(
    {
      thing: {
        libertydaoSponsorship: {
          "": JSON.stringify(state),
        },
      },
    },
    {
      onCommit: () => {
        State.update({
          proposal: "",
          what: "",
          forWho: "",
          why: "",
          status: "",
          timeline: "",
          needs: "",
        });
      },
      onCancel: () => {
        State.update({
          proposal: "",
          what: "",
          forWho: "",
          why: "",
          status: "",
          timeline: "",
          needs: "",
        });
      },
    }
  );
}

return (
  <Container>
    <Header>
      <Title>
        Each of these plays a role in supporting the people and projects that
        make Liberty so special.
      </Title>
      <Subtitle>What/Who should join our network next?</Subtitle>
    </Header>

    <FormLabel>Proposal:</FormLabel>
    <TextInput
      type="text"
      value={state.proposal}
      onChange={(e) => State.update({ proposal: e.target.value })}
    />

    <FormLabel>What:</FormLabel>
    <TextInput
      type="text"
      value={state.what}
      onChange={(e) => State.update({ what: e.target.value })}
    />

    <FormLabel>For Who:</FormLabel>
    <TextInput
      type="text"
      value={state.forWho}
      onChange={(e) => State.update({ forWho: e.target.value })}
    />

    <FormLabel>Why:</FormLabel>
    <TextInput
      type="text"
      value={state.why}
      onChange={(e) => State.update({ why: e.target.value })}
    />

    <FormLabel>Status:</FormLabel>
    <TextInput
      type="text"
      value={state.status}
      onChange={(e) => State.update({ status: e.target.value })}
    />

    <FormLabel>Timeline:</FormLabel>
    <TextInput
      type="text"
      value={state.timeline}
      onChange={(e) => State.update({ timeline: e.target.value })}
    />

    <FormLabel>Needs:</FormLabel>
    <TextInput
      type="text"
      value={state.needs}
      onChange={(e) => State.update({ needs: e.target.value })}
    />

    <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
  </Container>
);
