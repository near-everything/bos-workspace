/**
 * This is purely structure styles for the Page layout
 * Stateless
 * 
 * open // these are even somewhat unrelated
 * setOpen
 * pages
 * onPageChange
 */
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const Sidebar = styled.div`
  position: fixed;
  background-color: #333;
  height: 100vh;
  width: 300px;
  transition: all 0.5s ease-in-out;
  top: 0;
  z-index: 2000;
  left: ${props.open ? "0" : "-242px"};
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 58px;
  z-index: 1;
`;

const ToggleButton = styled.button`
  background-color: #555;
  color: #fff;
  border: none;
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  height: 50px;
  width: 30px;
  cursor: pointer;
  outline: none;
  z-index: 2001;

  &:hover {
    background-color: #666;
  }
`;

const Children = props.Children;

function Navbar({ open, setOpen, pages, onPageChange }) {
  return (
    <Wrapper>
      <Sidebar>
        <ToggleButton onClick={() => setOpen(!open)}>
          {open ? "<" : ">"}
        </ToggleButton>
      </Sidebar>
      <MainContent>
        <Children />
      </MainContent>
    </Wrapper>
  );
}

return Navbar(props);
