return (
  <div className="border">
    <Widget
      src="every.near/widget/Provider"
      props={{
        Children: (p) => <Widget src="every.near/widget/thing.2" props={p} />,
      }}
    />
  </div>
);
