const thingId = props.thingId;

const thingInfo = Social.get(`libertydao.near/thing/project/${thingId}/**`, "final");

if (!thingInfo) {
  return "group details not found";
}
const groupData = JSON.parse(thingInfo[""]);

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
  min-height: 240px;
  height: 240px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const { Feed } = VM.require("efiz.near/widget/Module.Feed");
Feed = Feed || (() => <></>);

const tabs = [
  {
    defaultActive: true,
    title: "Activity",
    iconClass: "bi bi-house-door",
    module: () => (
      <>
        <Widget
          src="devs.near/widget/Compose"
          props={{
            index: {
              post: JSON.stringify([
                {
                  key: {
                    type: "thing",
                    path: thingId,
                  },
                  value: {
                    type: "md",
                  },
                },
                {
                  key: "main",
                  value: {
                    type: "md",
                  },
                },
              ]),
            },
          }}
        />
        <Feed
          index={[
            {
              action: "post",
              key: {
                type: "thing",
                path: thingId,
              },
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
              key: JSON.stringify({
                type: "thing",
                path: thingId,
              }),
              options: {
                limit: 10,
                order: "desc",
                accountId: props.accounts,
              },
              cacheOptions: {
                ignoreCache: true,
              },
            },
          ]}
          Item={(p) => (
            <Widget
              loading={<div className="w-100" style={{ height: "200px" }} />}
              src="mob.near/widget/MainPage.N.Post"
              props={{ accountId: p.accountId, blockHeight: p.blockHeight }}
            />
          )}
        />
      </>
    ),
  },
];

State.init({
  selectedTab: tabs[0],
});

const { metadata } = thingInfo;
const { title, image, backgroundImage } = metadata;

function Module({ module }) {
  if (typeof module === "function") {
    return module();
  } else {
    return <Widget src={module.src} />;
  }
}

return (
  <div className="d-flex flex-column gap-3 bg-white w-full">
    <Banner
      className="object-fit-cover"
      style={{
        background: `center / cover no-repeat url(https://ipfs.near.social/ipfs/${backgroundImage.ipfs_cid})`,
      }}
    />

    <div className="d-md-flex d-block justify-content-between container">
      <div className="d-md-flex d-block align-items-end">
        <div className="d-flex flex-column ps-3 pt-3 pb-2">
          <span className="h1 text-nowrap">{title}</span>
        </div>
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
      <Module module={state.selectedTab.module} />
    </Content>
  </div>
);
