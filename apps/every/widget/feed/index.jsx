const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (hover: none) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const feeds = {
  all: {
    src: {
      path: "devs.near/widget/Feed",
      blockHeight: "final",
    },
    initialProps: {
      index: {
        action: "post",
        key: "main",
        options: {
          limit: 10,
          order: "desc",
        },
      },
      Item: (p) => (
        <Widget
          loading={<div className="w-100" style={{ height: "200px" }} />}
          src="mob.near/widget/MainPage.N.Post"
          props={p}
        />
      ),
      // Layout: Grid,
    },
    navElement: {
      label: "All",
      to: "all",
    },
  },
  video: {
    src: {
      path: "devs.near/widget/Feed",
      blockHeight: "final",
    },
    initialProps: {
      index: {
        action: "every",
        key: "video",
        options: {
          limit: 10,
          order: "desc",
        },
      },
      Item: (p) => (
        <Widget
          src="efiz.near/widget/App.Video.card"
          props={{ ...p, ...props }}
        />
      ),
      Layout: Grid,
      buildPath: (item) => `${item.accountId}/thing/${item.value.id}`,
    },
  },
};
return (
  <Widget
    src="devs.near/widget/Router"
    blockHeight={"final"}
    props={{
      Navigator: {
        // template for your navbar
        src: {
          path: "every.near/widget/feed.navbar",
          blockHeight: "final",
        },
        theme: "", // TODO: add theme
      },
      routes: feeds,
    }}
  />
);

// {
//   browse: {
//     src: {
//       path: "efiz.near/widget/App.Video.browse",
//       blockHeight: "final",
//     },
//   },
//   view: {
//     src: {
//       path: "efiz.near/widget/App.Video.view",
//       blockHeight: "final",
//     },
//   },
//   create: {
//     src: {
//       path: "efiz.near/widget/App.Video.create",
//       blockHeight: "final",
//     },
//   },
//   library: {
//     src: {
//       path: "efiz.near/widget/Library.index",
//       blockHeight: "final",
//     },
//   },
// },
