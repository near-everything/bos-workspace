const tab = props.tab;

const tabs = {
  welcome: () => (
    <>
      <Container>
        <Flex>
          <H1>
            🗽 Liberty <span>DAO</span>
          </H1>
          <Text style={{ maxWidth: "350px" }}>
            New Yorkers building a better future with our local and global
            communities.
          </Text>
        </Flex>
      </Container>
      <Flex>
        <Text
          size="14px"
          weight="600"
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.17em",
            textAlign: "center",
          }}
        >
          Made Possible by Collaboration
        </Text>
        <Widget src="hack.near/widget/dev.Badge" />
      </Flex>
    </>
  ),
  boroughs: () => <Widget src="libertydao.near/widget/boroughs.index" />,
  supporting: () => <Widget src="libertydao.near/widget/supporting.index" />,
  projects: () => <Widget src="libertydao.near/widget/projects.index" />,
  initiatives: () => <Widget src="libertydao.near/widget/initiatives.index" />,
  happening: () => <Widget src="itexpert120-contra.near/widget/Calendar" />,
};

State.init({ selectedTab: tab });

const Root = styled.div`
  font-family: "DM Sans", sans-serif;

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

  // .ndc-card {
  //   border-radius: 16px;
  //   box-shadow:
  //     rgba(0, 0, 0, 0.1) 0 1px 3px,
  //     rgba(0, 0, 0, 0.05) 0 1px 20px;
  //   background-color: #fff;
  // }
`;

const H1 = styled.h1`
  font-family: sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 90px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 0;
  max-width: 700px;

  span {
    display: inline-block;
    background: #96d2b7;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
  }
`;

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
  max-width: 670px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: column;
  flex-wrap: "nowrap";

  @media (max-width: 998px) {
    flex-direction: column;
    gap: var(--section-gap);
  }
`;

const Container = styled.div`
  display: flex;
  max-width: 1080px;
  margin: 128px auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;

  @media (max-width: 768px) {
    padding: var(--section-gap) 12px;
  }
`;

const Content = styled.div`
  .post {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: ${(p) => p.size || "25px"};
  line-height: 1.2em;
  color: linear-gradient(89.97deg, #ae67fa 1.84%, #f49867 102.67%);
  margin: ${(p) => (p.margin ? "0 0 24px" : "0")};
  overflow-wrap: anywhere;
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
    <Content key={state.selectedTab}>
      {tabs[state.selectedTab] && tabs[state.selectedTab]()}
    </Content>
  </Root>
);
