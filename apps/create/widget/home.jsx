/*__@import:QoL/widget__*/
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
    widget: "/*__@appAccount__*//widget/manager.index",
    provider: "/*__@appAccount__*//widget/Provider",
  },
  {
    id: "editor",
    title: "Editor",
    active: state.page === "editor",
    widget: "/*__@appAccount__*//widget/editor.index",
    provider: "/*__@appAccount__*//widget/Provider",
  },
  {
    id: "manage",
    title: "Manage",
    active: state.page === "manage",
    widget: "/*__@appAccount__*//widget/project.index",
    provider: "/*__@appAccount__*//widget/Provider",
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
    {/** Now I'm thinking about Layouts, because I'd like to be able to have a fixed sidebar */}
    {
      <Widget
        src="/*__@appAccount__*//widget/Layout"
        props={{
          templates: {
            NAVBAR: "create.near/widget/templates.ui.navbar.left",
          },
          onPageChange: navigate,
          pages: ["projects"],
          Children: () => (
            <>
              {activePage.provider ? (
                <Widget
                  src={activePage.provider}
                  props={{
                    Children: (p) => widget(activePage.widget, p),
                    navigate,
                    project,
                    ...props,
                  }}
                />
              ) : (
                <Widget
                  src={activePage.widget}
                  props={{ ...props, navigate, project }}
                />
              )}
            </>
          ),
        }}
      />
    }
  </>
);

// {/** First did swapping templates (switch between templates.ui.navbar.nearui and templates.ui.navbar.default) */}
// <div className="row">
//   {widget("/*__@appAccount__*//widget/ui.navbar", {
//     template: "create.near/widget/templates.ui.navbar.nearui",
//     onPageChange: navigate,
//     pages: ["projects"],
//   })}
//   <div className="col">
//     {activePage.provider
//       ? widget(activePage.provider, {
//           Children: (p) => widget(activePage.widget, p),
//           navigate,
//           project,
//           ...props,
//           // Ok now I'm thinking about this...
//           // we can pass down the templates/things/plugins to use
//           templates: {
//             Folders: () =>
//               widget("/*__@appAccount__*//widget/editor.uiFolders", props),
//           },
//         })
//       : widget(activePage.widget, { ...props, navigate, project })}
//   </div>
// </div>
