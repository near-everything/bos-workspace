const handleSubmit = props.handleSubmit || (() => {});

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
`;

const Header = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
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
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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

return (
  <Container>
    <Header>
      <p>
        We're developing support systems through an ever-growing network for
        your success.
      </p>
      <p>What will you do with it?</p>
      <p>Tell us about your vision for a better future.</p>
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

    <SubmitButton onClick={handleSubmit(state)}>Submit</SubmitButton>
  </Container>
);
