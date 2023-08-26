/*__@import:QoL/Url__*/

const { handleCreateProject, projects, navigate } = props;

/*__@import:QoL/widget__*/

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  list-style: none;
  grid-gap: 36px;
  margin-bottom: 36px;
`;

const Header = props.Header;
const Projects = props.Projects;

return (
  <>
    <Header />

    <Projects />
  </>
);
