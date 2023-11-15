return (
  <Widget
    src="devs.near/widget/Router"
    blockHeight={"final"}
    props={{
      Navigator: {
        // template for your navbar
        src: {
          path: "efiz.near/widget/App.Header",
          blockHeight: "final",
        },
        theme: "", // TODO: add theme
      },
      routes: {
        browse: {
          src: {
            path: "efiz.near/widget/App.Video.browse",
            blockHeight: "final",
          },
        },
        view: {
          src: {
            path: "efiz.near/widget/App.Video.view",
            blockHeight: "final",
          },
        },
        create: {
          src: {
            path: "efiz.near/widget/App.Video.create",
            blockHeight: "final",
          },
        },
        library: {
          src: {
            path: "efiz.near/widget/Library.index",
            blockHeight: "final",
          },
        },
      },
    }}
  />
);

// I feel like the provider should surround the router.
