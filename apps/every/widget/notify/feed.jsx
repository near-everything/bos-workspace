const { Feed } = VM.require("devs.near/widget/Module.Feed");
const { ContextMenu } = VM.require("efiz.near/widget/Module.ContextMenu");

ContextMenu = ContextMenu || (() => <></>); // make sure you have this or else it can break
Feed = Feed || (() => <></>);

function NotificationItem(props) {
  const { value } = props;

  const loading = <div className="placeholder" style={{ height: "48px" }} />;

  const widgetSrc =
    value.type === "follow" || value.type === "unfollow"
      ? "mob.near/widget/Notification.Item.Follow"
      : value.type === "poke"
      ? "mob.near/widget/Notification.Item.Poke"
      : value.type === "like"
      ? "mob.near/widget/Notification.Item.Like"
      : value.type === "comment"
      ? "mob.near/widget/Notification.Item.Comment"
      : value.type && value.type?.startsWith("devgovgigs/")
      ? "mob.near/widget/Notification.Item.DevGov"
      : value.type === "mention"
      ? "mob.near/widget/Notification.Item.Mention"
      : value.type === "repost"
      ? "mob.near/widget/Notification.Item.Repost"
      : value.type === "chess-game"
      ? "chess-game.near/widget/Notification.Item.ChessGame@98857466"
      : null;


  return (
    <div className="mb-3">
      {widgetSrc ? (
        <Widget
          loading={loading}
          src={widgetSrc}
          props={{ loading, ...props }}
        />
      ) : (
        <div>
          Unknown notification:{" "}
          <span className="font-monospace">{JSON.stringify(value)}</span>
        </div>
      )}
    </div>
  );
}
return (
  <div
    className="d-flex flex-column gap-1"
    style={{
      background: "#fefefe",
      padding: "23px",
    }}
  >
    <h3>
      <b>Every Notification</b>
    </h3>
    <Feed
      index={{
        action: "notify",
        key: props.accountId || context.accountId,
        options: {
          limit: 10,
          order: "desc",
          subscribe: true,
        },
        cacheOptions: {
          ignoreCache: true,
        },
      }}
      Item={(p, i) => {
        if (i === 0) {
          Storage.set("lastBlockHeight", p.blockHeight);
        }
        console.log(p);
        return (
          <NotificationItem {...p} />
          
        );
      }}
    />
  </div>
);
