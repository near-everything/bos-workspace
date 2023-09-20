const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const TextInput = styled.input`
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

const [proposal, setProposal] = useState("");
const [what, setWhat] = useState("");
const [forWho, setForWho] = useState("");
const [why, setWhy] = useState("");
const [status, setStatus] = useState("");
const [timeline, setTimeline] = useState("");
const [needs, setNeeds] = useState("");

const handleSubmit = () => {
  // Handle form submission here using the individual state variables.
  console.log({
    proposal,
    what,
    forWho,
    why,
    status,
    timeline,
    needs,
  });
};

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
      value={proposal}
      onChange={(e) => setProposal(e.target.value)}
    />

    <FormLabel>What:</FormLabel>
    <TextInput
      type="text"
      value={what}
      onChange={(e) => setWhat(e.target.value)}
    />

    <FormLabel>For Who:</FormLabel>
    <TextInput
      type="text"
      value={forWho}
      onChange={(e) => setForWho(e.target.value)}
    />

    <FormLabel>Why:</FormLabel>
    <TextInput
      type="text"
      value={why}
      onChange={(e) => setWhy(e.target.value)}
    />

    <FormLabel>Status:</FormLabel>
    <TextInput
      type="text"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    />

    <FormLabel>Timeline:</FormLabel>
    <TextInput
      type="text"
      value={timeline}
      onChange={(e) => setTimeline(e.target.value)}
    />

    <FormLabel>Needs:</FormLabel>
    <TextInput
      type="text"
      value={needs}
      onChange={(e) => setNeeds(e.target.value)}
    />

    <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
  </Container>
);
