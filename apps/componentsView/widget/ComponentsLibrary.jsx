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
    margin-right: 1.5rem;

    @media (width < 786px) {
      margin-right: 0;
    }
  `;

  const sidebarButton = styled.div`
    border: 1px solid #dee2e6;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    cursor: pointer;

    transition: all 300ms;

    &:hover {
      background: rgba(0, 0, 0, 0.075);
    }

    &:active {
      background: rgba(0, 0, 0, 0.5);
      color: white;
    }
  `;

  return (
    <sidebarDiv>
      <h2 className="mb-4">📚 Libraries</h2>
      <div>
        <sidebarButton
          onClick={() => {
            State.update({ components: componentList });
          }}
        >
          All Components
        </sidebarButton>
        <hr />
        {componentList.map((it) => (
          <sidebarButton
            onClick={() => {
              const filterCategory = componentList.filter(
                (cat) => cat.category === it.category
              );
              State.update({ components: filterCategory });
            }}
          >
            {it.category}
          </sidebarButton>
        ))}
      </div>
      <hr />
    </sidebarDiv>
  );
};

const componentView = ({ it }) => {
  const categoryDiv = styled.div`
    margin-bottom: 1rem;
  `;

  return (
    <>
      <categoryDiv key={`category-${it.id}`}>
        <h5>{it.category}</h5>
        <hr />
        <div className="d-flex flex-column">
          {it.components.map((comp) => (
            <div className="mb-2">
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

const mainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;

  @media (width < 786px) {
    width: 100%;
  }
`;

return (
  <div>
    <responsiveSidebar>
      <Sidebar />
      <mainContent>
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
      </mainContent>
    </responsiveSidebar>
  </div>
);
