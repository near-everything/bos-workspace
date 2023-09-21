const tab = props.tab || "welcome";

const tabs = {
  welcome: () => (
    <Widget src="libertydao.near/widget/welcome.index" loading={<></>} />
  ),
  boroughs: () => (
    <Widget src="libertydao.near/widget/boroughs.index" loading={<></>} />
  ),
  supporting: () => (
    <Widget src="libertydao.near/widget/supporting.index" loading={<></>} />
  ),
  projects: () => (
    <Widget src="libertydao.near/widget/projects.index" loading={<></>} />
  ),
  initiatives: () => (
    <Widget src="libertydao.near/widget/initiatives.index" loading={<></>} />
  ),
  // happening: () => <Widget src="itexpert120-contra.near/widget/Calendar" />,
};

State.init({ selectedTab: tab });

const Root = styled.div`
  position: relative;
  font-family: "DM Sans", sans-serif;
  height: 100vh;

  --primary-color: #1c6758;
  --secondary-color: #e1e7d2;
  --light-color: #fdfffe;
  --dark-color: #0b1e28;

  --header-height: 70px;

  background-color: var(--primary-color);
  // cursor: url(https://cur.cursors-4u.net/cursors/cur-3/cur283.ani), url(https://cur.cursors-4u.net/cursors/cur-3/cur283.png), auto !important;
  font-size: 16px;
  line-height: 1.5;
  color: var(--dark-color);

  a {
    text-decoration: none;
  }

  // TODO: Define theme colors

  .l__card {
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

return (
  <Root>
    <Widget src={`libertydao.near/widget/Typography.DMSans`} loading={<></>} />
    <Widget
      src={"libertydao.near/widget/navbar"}
      props={{ tab, tabs }}
      loading={<></>}
    />
    {tabs[state.selectedTab] && tabs[state.selectedTab]()}
  </Root>
);
