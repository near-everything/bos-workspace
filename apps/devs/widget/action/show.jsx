const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const [id, setId] = useState("");

const handleButtonClick = () => {
  // Do something with the ID
  console.log(`ID is: ${id}`);
};

return (
  <Container>
    <Input
      type="text"
      placeholder="Enter ID"
      value={id}
      onChange={(e) => setId(e.target.value)}
    />
    <Button onClick={handleButtonClick}>Submit ID</Button>
  </Container>
);
