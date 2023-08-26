/*__@import:QoL/Url__*/

State.init({
  page: props.page ?? "projects",
  project: props.project ?? null,
});

const pages = [
  {
    id: "projects",
    title: "Projects",
    active: state.page === "projects",
    widget: "create.near/widget/manager.index",
    provider: "create.near/widget/Provider",
  },
  {
    id: "editor",
    title: "Editor",
    active: state.page === "editor",
    widget: "create.near/widget/editor.index",
    provider: "create.near/widget/Provider",
  },
  {
    id: "manage",
    title: "Manage",
    active: state.page === "manage",
    widget: "create.near/widget/project.index",
    provider: "create.near/widget/Provider",
  },
];
const activePage = pages.find((p) => p.active);

const navigate = (v, params) => {
  State.update({ page: v, project: params?.project });
  const url = Url.construct("#//*__@appAccount__*//widget/home", params);
  Storage.set("url", url);
};

return (
  <>
    <Widget
      src="/*__@appAccount__*//widget/ui.navbar"
      props={{
        onPageChange: navigate,
        pages: ["projects"],
      }}
    />
    {activePage.provider ? (
      <Widget
        src={activePage.provider}
        props={{
          Children: (p) => <Widget src={activePage.widget} props={p} />,
          navigate,
          project,
          ...props,
        }}
      />
    ) : (
      <Widget src={activePage.widget} props={{ ...props, navigate, project }} />
    )}
  </>
);
