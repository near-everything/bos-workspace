const index = props.index;
const Item = props.Item;
const Layout = props.Layout;

const renderItem = (item, i) => {
  return (
    <div key={JSON.stringify(item)}>
      <Item {...item} />
    </div>
  );
};

return (
  <Widget
    src="devs.near/widget/PR.FilteredIndexFeed"
    props={{
      index,
      renderItem,
      Layout: ({ children }) => <Layout>{children}</Layout>,
    }}
  />
);
