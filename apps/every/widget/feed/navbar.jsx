const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
`;

const Sidebar = styled.div`
  position: fixed;
  background-color: #333;
  height: 100vh;
  width: 300px;
  // transition: all 0.5s ease-in-out;
  top: 0;
  z-index: 2000;
  left: ${props.open ? "0" : "-242px"}; // props.open determines position
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
    background-color: #666; /* subtle hover effect */
  }
`;

const RouteButton = styled.div`
  background-color: white;
  color: black;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #ddd;
  }
`;

function Navbar({ open, setOpen, Outlet, RouterLink, routes }) {
  console.log(routes);
  return (
    <Wrapper>
      <Sidebar>
        {routes &&
          Object.keys(routes).map((routeKey) => (
            <RouteButton key={routeKey}>
              <RouterLink to={routeKey}>{routeKey}</RouterLink>
            </RouteButton>
          ))}
        <ToggleButton onClick={() => setOpen(!open)}>
          {open ? "<" : ">"}
        </ToggleButton>
      </Sidebar>
      <MainContent>
        <Outlet />
      </MainContent>
    </Wrapper>
  );
}

return Navbar(props);
