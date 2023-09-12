const creatorId = props.creatorId;
const groupId = props.groupId;

const groupInfo = Social.get(
  `${creatorId}/thing/${groupId}/metadata/**`,
  "final"
);

if (!groupInfo) {
  return "group details not found";
}

const NavUnderline = styled.ul`
  border-bottom: 1px #eceef0 solid;

  a {
    color: #687076;
    text-decoration: none;
  }

  a.active {
    font-weight: bold;
    color: #0c7283;
    border-bottom: 4px solid #0c7283;
  }
`;
/* END_INCLUDE: "core/lib/gui/navigation" */

const Button = styled.button`
  height: 40px;
  font-size: 14px;
  border-color: #e3e3e0;
  background-color: #ffffff;
`;

const Banner = styled.div`
  max-width: 100%;
  width: 1320px;
  min-height: 240px;
  height: 240px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const tabs = [
  {
    defaultActive: true,
    iconClass: "bi bi-house-door",
    route: "devs.near/widget/Feed",
    title: "Activity",
    passProps: {
      index: [
        {
          action: "post",
          key: "main",
          options: {
            limit: 10,
            order: "desc",
            accountId: props.accounts,
          },
          cacheOptions: {
            ignoreCache: true,
          },
        },
        {
          action: "repost",
          key: "main",
          options: {
            limit: 10,
            order: "desc",
            accountId: props.accounts,
          },
          cacheOptions: {
            ignoreCache: true,
          },
        },
      ],
      Item: (p) => (
        <Widget
          loading={<div className="w-100" style={{ height: "200px" }} />}
          src="mob.near/widget/MainPage.N.Post"
          props={{ accountId: p.accountId, blockHeight: p.blockHeight }}
        />
      ),
    },
  },
];

State.init({
  selectedTab: tabs[0],
});

const { name, description, image, backgroundImage } = groupInfo;

return (
  <div className="d-flex flex-column gap-3 bg-white">
    <Banner
      className="object-fit-cover"
      style={{
        background: `center / cover no-repeat url(https://ipfs.near.social/ipfs/${backgroundImage.ifps_cid})`,
      }}
    />

    <div className="d-md-flex d-block justify-content-between container">
      <div className="d-md-flex d-block align-items-end">
        <div className="position-relative">
          <div style={{ width: 150, height: 100 }}>
            <img
              alt="Loading logo..."
              className="border border-3 border-white rounded-circle shadow position-absolute"
              width="150"
              height="150"
              src={`https://ipfs.near.social/ipfs/${image.ifps_cid}`}
              style={{ top: -50 }}
            />
          </div>
        </div>

        <div className="d-flex flex-column ps-3 pt-3 pb-2">
          <span className="h1 text-nowrap">{name}</span>
          <span className="text-secondary">{description}</span>
        </div>
      </div>

      <div className="d-flex align-items-end gap-3">
        <Button className="btn btn-outline-primary">Join</Button>
      </div>
    </div>

    <NavUnderline className="nav">
      {tabs.map(({ iconClass, title }, index) =>
        title ? (
          <li className="nav-item" key={title}>
            <div
              className={[
                "d-inline-flex gap-2",
                state.selectedTab === title ? "nav-link active" : "nav-link",
              ].join(" ")}
              onClick={() => State.update({ selectedTab: tabs[index] })}
            >
              <i className={iconClass} />
              <span>{title}</span>
            </div>
          </li>
        ) : null
      )}
    </NavUnderline>
    <Content>
      <Widget
        src={state.selectedTab.route}
        props={state.selectedTab.passProps}
        loading={<></>}
      />
    </Content>
  </div>
);
