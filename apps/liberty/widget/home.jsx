const tab = props.tab || "welcome";

const tabs = {
  welcome: () => <Widget src="libertydao.near/widget/welcome.index" />,
  boroughs: () => <Widget src="libertydao.near/widget/boroughs.index" />,
  supporting: () => <Widget src="libertydao.near/widget/supporting.index" />,
  // projects: () => <Widget src="libertydao.near/widget/projects.index" />,
  initiatives: () => <Widget src="libertydao.near/widget/initiatives.index" />,
  // happening: () => <Widget src="itexpert120-contra.near/widget/Calendar" />,
};

State.init({ selectedTab: tab });

const Root = styled.div`
  font-family: "DM Sans", sans-serif;
  height: 100vh;

  --main-color: #1c6758;
  --header-height: 70px;
  
  background-color: var(--main-color);

  font-size: 16px;
  line-height: 1.5;
  color: #0b1e28;

  a {
    text-decoration: none;
  }

  // TODO: Define theme colors
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

return (
  <Root>
    <Widget src={`libertydao.near/widget/Typography.DMSans`} />
    <Header>
      <Widget src={"libertydao.near/widget/navbar"} props={{ tab, tabs }} />
    </Header>
    {tabs[state.selectedTab] && tabs[state.selectedTab]()}
  </Root>
);
