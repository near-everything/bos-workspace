const index = props.index;
const Item = props.Item;
const Layout = props.Layout;
const typeWhitelist = props.typeWhitelist;

const renderedItems = {};

Item = Item || ((props) => <div>{JSON.stringify(props)}</div>);
Layout = Layout || (({ children }) => children);

const renderItem = (item, i) => {
  console.log(item);
  if (typeWhitelist && !typeWhitelist.includes(item.value.type)) {
    return false;
  }
  return (
    <div key={JSON.stringify(item)}>
      <Item {...item} />
    </div>
  );
};

if (Array.isArray(index)) {
  return (
    <Widget
      src="devs.near/widget/PR.MergedIndexFeed"
      props={{
        index,
        renderItem,
        Layout: ({ children }) => <Layout>{children}</Layout>,
      }}
    />
  );
} else {
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
}
