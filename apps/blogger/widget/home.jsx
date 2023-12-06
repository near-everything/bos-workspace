/**
 * Project: Create
 * By: efiz.near, sking.near
 * Repository: https://github.com/near-everything/bos-workspace
 */

const pages = [
  {
    id: "editor",
    title: "Editor",
    widget: "/*__@appAccount__*//widget/editor.index",
    provider: "/*__@appAccount__*//widget/Provider",
  },
];

return (
  <>
    <div className="row">
      <div className="col">
        <Widget
          src={"/*__@appAccount__*//widget/Provider"}
          props={{
            Children: (p) => (
              <Widget
                src={"/*__@appAccount__*//widget/editor.index"}
                props={p}
              />
            ),
            ...props,
          }}
        />
      </div>
    </div>
  </>
);
