const tab = props.tab || "welcome";

const tabs = {
  welcome: () => <Widget src="libertydao.near/widget/welcome.index" />,
  boroughs: () => <Widget src="libertydao.near/widget/boroughs.index" />,
  supporting: () => <Widget src="libertydao.near/widget/supporting.index" />,
  // projects: () => <Widget src="libertydao.near/widget/projects.index" />,
  initiatives: () => <Widget src="libertydao.near/widget/initiatives.index" />,
  happening: () => <Widget src="itexpert120-contra.near/widget/Calendar" />,
};

State.init({ selectedTab: tab });

const Root = styled.div`
  font-family: "DM Sans", sans-serif;
  height: 100vh;

  font-size: 16px;
  line-height: 1.5;
  color: #000;

  a {
    color: #000;
    text-decoration: none;
  }

  a:hover {
    color: #4498e0;
  }
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  margin: 12px 12px 0 0;
  border-bottom: 1px solid #eceef0;
  overflow: auto;
  scroll-behavior: smooth;
  cursor: pointer;

  @media (max-width: 1200px) {
    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 24px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;
  &:hover {
    color: #11181c;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(89.97deg, #ae67fa 1.84%, #f49867 102.67%);
  }
`;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

return (
  <Root>
    <Widget src={`libertydao.near/widget/Typography.DMSans`} />
    <Tabs>
      {Object.keys(tabs).map((t) => (
        <Link key={key} href={`?tab=${t}`}>
          <TabsButton selected={state.selectedTab === t}>
            {capitalizeFirstLetter(t)}
          </TabsButton>
        </Link>
      ))}
    </Tabs>
    {tabs[state.selectedTab] && tabs[state.selectedTab]()}
  </Root>
);
