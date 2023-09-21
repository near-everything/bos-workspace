const componentsURL =
  "https://raw.githubusercontent.com/NEARBuilders/BOSLibraries/main/library.json";

function loadComponents() {
  const res = fetch(componentsURL);
  return res.body && JSON.parse(res.body);
}

const componentList = loadComponents();
if (!componentList) {
  return "⧗ Loading Components...";
}

State.init({
  components: componentList,
});

const Sidebar = () => {
  const sidebarDiv = styled.div`
    min-width: 20%;
  `;

  return (
    <sidebarDiv className="me-4">
      <h2 className="mb-4">📚 Libraries</h2>
      <div>
        <div
          style={{ cursor: "pointer" }}
          className="border p-2 d-flex align-items-center rounded-pill justify-content-center mb-2 shadow-sm "
          onClick={() => {
            State.update({ components: componentList });
          }}
        >
          All Components
        </div>
        <hr />
        {componentList.map((it) => (
          <div
            style={{ cursor: "pointer" }}
            className="border p-2 d-flex align-items-center rounded-pill justify-content-center mb-2 shadow-sm "
            onClick={() => {
              const filterCategory = componentList.filter(
                (cat) => cat.category === it.category
              );
              State.update({ components: filterCategory });
            }}
          >
            {it.category}
          </div>
        ))}
      </div>
    </sidebarDiv>
  );
};

const componentView = ({ it }) => {
  const categoryDiv = styled.div`
    margin-bottom: 1rem;
    width: 100%;
  `;

  return (
    <>
      <categoryDiv key={`category-${it.id}`}>
        <h5>{it.category}</h5>
        <hr />
        <div className="d-flex flex-column">
          {it.components.map((comp) => (
            <div className="mb-2" style={{ maxWidth: "100%" }}>
              <Widget
                src="near/widget/ComponentCard"
                props={{
                  src: `${comp.accountId}/widget/${comp.widgetName}`,
                }}
              />
            </div>
          ))}
        </div>
      </categoryDiv>
    </>
  );
};

const responsiveSidebar = styled.div`
  display: flex;
  flex-direction: row;

  @media (width < 786px) {
    flex-direction: column;
  }
`;

return (
  <div className="container">
    <responsiveSidebar>
      <Sidebar />
      <div style={{ flex: 1, marginRight: "1rem" }}>
        <div className="mb-4">
          <h1>Component Libraries</h1>
          <p className="lead">Libraries for building a better BOS.</p>

          <div>
            <Widget src="mob.near/widget/Editor.ComponentSearch" />
          </div>
        </div>
        <div className="mb-4">
          <h2>Libraries</h2>
          <p className="text-body-secondary">
            A curated list of common librairies grouped by categories.
          </p>
        </div>

        {state.components.map((it) => (
          <componentView it={it} />
        ))}
      </div>
    </responsiveSidebar>
  </div>
);
