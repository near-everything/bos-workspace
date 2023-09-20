const tab = props.tab || "welcome";

const tabs = {
  welcome: () => <Widget src="libertydao.near/widget/welcome.index" />,
  boroughs: () => <Widget src="libertydao.near/widget/boroughs.index" />,
  supporting: () => <Widget src="libertydao.near/widget/supporting.index" />,
  projects: () => <Widget src="libertydao.near/widget/projects.index" />,
  initiatives: () => <Widget src="libertydao.near/widget/initiatives.index" />,
  // happening: () => <Widget src="itexpert120-contra.near/widget/Calendar" />,
};

State.init({ selectedTab: tab });

const Root = styled.div`
  font-family: "DM Sans", sans-serif;
  height: 100vh;

  --primary-color: #1c6758;
  --secondary-color: #e1e7d2;
  --light-color: #fdfffe;
  --dark-color: #0b1e28;

  --header-height: 70px;

  background-color: var(--primary-color);

  font-size: 16px;
  line-height: 1.5;
  color: var(--dark-color);

  a {
    text-decoration: none;
  }

  // TODO: Define theme colors
`;

return (
  <Root>
    <Widget src={`libertydao.near/widget/Typography.DMSans`} />
    <Widget src={"libertydao.near/widget/navbar"} props={{ tab, tabs }} />
    {tabs[state.selectedTab] && tabs[state.selectedTab]()}
  </Root>
);
