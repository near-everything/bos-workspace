const index = props.index;
const makePostItem =
  props.makePostItem ||
  ((a) => ({
    type: "social",
    path: `${a.accountId}/post/main`,
    blockHeight: a.blockHeight,
  }));
const Item = props.Item;
const Layout = props.Layout;
const typeWhitelist = props.typeWhitelist || ["md"];

const renderedPosts = {};

const renderItem = (a) => {
  if (typeWhitelist && !typeWhitelist.includes(a.value.type)) {
    return false;
  }
  const item = JSON.stringify(makePostItem(a));
  if (item in renderedPosts) {
    return false;
  }
  renderedPosts[item] = true;
  return (
    <div key={JSON.stringify(a)}>
      <Item {...a} RouterLink={props.RouterLink} />
    </div>
  ); // I'm doing ...props in order to pass RouterLink... is there a better way to do this?
}; // Are there other times we'd like to pass props down? I don't think so...
// RouterLink doesn't even work

return (
  <Widget
    src="devs.near/widget/PR.FilteredIndexFeed" // TODO: Convert to MergedIndexFeed
    props={{
      index,
      renderItem,
      Layout: ({ children }) =>
        Layout ? <Layout>{children}</Layout> : children,
    }}
  />
);
