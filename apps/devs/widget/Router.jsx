/*__@import:QoL/Url__*/

const routes = props.routes;
if (!routes) {
  routes = {};
}
const Navigator = props.Navigator;

State.init({
  CurrentWidget: null,
  open: false,
});

function init() {
  if (!state.CurrentWidget) {
    // TODO: check from local storage or props
    const initialSrc = Object.values(props.routes)[0];
    State.update({ CurrentWidget: initialSrc });
    // () => <Widget src={initialSrc.path} blockHeight={initialSrc.blockHeight} />
  }
}

init();

// Function to handle navigation
function handleNavigate(newRoute, passProps) {
  const currentSrc = props.routes[newRoute];
  State.update({ CurrentWidget: currentSrc, passProps });
  // TODO: verify this works
  // TODO: need to know the index widget
  const url = Url.construct("#//*__@appAccount__*//widget/home", params);
  Storage.set("url", url);
}

// const activePage = pages.find((p) => p.active);

function RouterLink({ to, children, passProps }) {
  return (
    <span
      onClick={() => handleNavigate(to, passProps)}
      key={"link-to-" + to}
      style={{ cursor: "pointer" }}
    >
      {children}
    </span>
  );
}

// Render the current widget or a default message if the route is not found
return (
  <Widget
    src={Navigator.src.path || "devs.near/widget/Navigator"} // This should hold all of the styles for the navbar
    blockHeight={Navigator.src.blockHeight || "final"}
    props={{
      RouterLink, // this let's you navigate amongst the routes passed in
      routes: props.routes,
      activePage: null, // TODO: determine active page here
      Outlet: () => {
        // this needs be positioned within the navigator somehow
        return state.CurrentWidget ? ( // TODO: potentially make this more expicit earlier
          <div key={JSON.stringify(state.CurrentWidget)}>
            <Widget
              src={state.CurrentWidget.src.path}
              blockHeight={state.CurrentWidget.src.blockHeight}
              props={{
                RouterLink,
                ...state.passProps,
                ...state.CurrentWidget.initialProps,
              }}
            />
          </div>
        ) : (
          <div>{JSON.stringify(state.CurrentWidget)}</div>
        );
      },
      open: state.open,
      setOpen: (v) => State.update({ open: v }),
    }}
  />
);
