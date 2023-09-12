const groupId = props.groupId ?? "526fb256e74eelmf0nw3n5909bc189c13d";

const updates = Social.index("graph", `${groupId}`, {
  limit: 10,
  order: "desc",
  subscribe: true,
});

const index = {
  action: "graph",
  key: groupId,
  options: {
    limit: 10,
    order: "desc",
  },
};

const ItemWrapper = styled.div`
  margin-bottom: 12px;
`;

State.init({
  showDetails: false,
});

const renderItem = (item) => {
  return (
    <ItemWrapper>
      {item.value.type === "add" && (
        <>
          <div className="d-flex justify-content-between row text-truncate text-muted">
            <div className="text-truncate col-auto">
              <div className="row">
                <div className="col-auto m-1">
                  <Widget
                    src="mob.near/widget/Profile"
                    props={{ accountId: item.accountId, tooltip: true }}
                  />{" "}
                </div>
                <div className="col-auto m-1 mt-3">
                  {item.value.type === "add" && `added`}
                  <Widget
                    src="mob.near/widget/TimeAgo"
                    props={{ blockHeight: item.blockHeight }}
                  />
                </div>
                <div className="col-auto m-1">
                  <Widget
                    src="mob.near/widget/Profile"
                    props={{ accountId: item.value.accountId, tooltip: true }}
                  />{" "}
                </div>
              </div>
            </div>
            <div className="text-truncate col-auto float-right mt-2">
              {context.accountId === item.value.accountId && (
                <Widget
                  src="hack.near/widget/accept"
                  props={{ groupId, accountId: item.value.accountId }}
                />
              )}
            </div>
          </div>
          <div>
            {state.showDetails && (
              <Widget
                src={`hack.near/widget/group`}
                props={{
                  groupId,
                  creatorId: item.accountId,
                }}
              />
            )}
          </div>
        </>
      )}
      {item.value.type === "join" && (
        <>
          <div className="d-flex justify-content-between row text-truncate text-muted">
            <div className="text-truncate col-auto">
              <div className="row">
                <div className="col-auto m-1">
                  <Widget
                    src="mob.near/widget/Profile"
                    props={{ accountId: item.accountId, tooltip: true }}
                  />{" "}
                </div>
                <div className="col-auto m-1 mt-3">
                  {item.value.type === "join" && "joined"}
                  <Widget
                    src="mob.near/widget/TimeAgo"
                    props={{ blockHeight: item.blockHeight }}
                  />
                </div>
              </div>
            </div>
            <div className="text-truncate col-auto float-right mt-2">
              {item.accountId !== context.accountId && (
                <Widget
                  src="hack.near/widget/approve"
                  props={{ groupId, accountId: item.accountId }}
                />
              )}
            </div>
          </div>
          <div>
            {state.showDetails && (
              <Widget
                src={`hack.near/widget/group`}
                props={{
                  groupId,
                  creatorId: item.accountId,
                }}
              />
            )}
          </div>
        </>
      )}
      {item.value.type === "create" && (
        <>
          <div className="d-flex justify-content-between row text-truncate text-muted">
            <div className="text-truncate col-auto">
              <div className="row">
                <div className="col-auto m-1">
                  <Widget
                    src="mob.near/widget/Profile"
                    props={{ accountId: item.accountId, tooltip: true }}
                  />{" "}
                </div>
                <div className="col-auto m-1 mt-3">
                  {item.value.type === "create" && "created"}
                  <Widget
                    src="mob.near/widget/TimeAgo"
                    props={{ blockHeight: item.blockHeight }}
                  />
                </div>
                <div className="col-auto m-1">
                  <Widget
                    src="hack.near/widget/group.info"
                    props={{
                      groupId,
                      accountId: item.accountId,
                      tooltip: true,
                    }}
                  />{" "}
                </div>
              </div>
            </div>
          </div>
          <div>
            {state.showDetails && (
              <Widget
                src={`hack.near/widget/group`}
                props={{
                  groupId,
                  creatorId: item.accountId,
                }}
              />
            )}
          </div>
        </>
      )}
    </ItemWrapper>
  );
};

return (
  <div className="m-2">
    <Widget
      src="mob.near/widget/FilteredIndexFeed"
      props={{ index, renderItem }}
    />
  </div>
);