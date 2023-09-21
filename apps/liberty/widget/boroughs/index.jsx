const MAP_STYLE = "mapbox://styles/mapbox/outdoors-v12";
const MAP_TOKEN =
  "pk.eyJ1IjoidGVqMDEiLCJhIjoiY2xqcHZ2dGpkMDB5azNsbzQ0bmMwNjRjaCJ9.FVv2zRPaLwzZMgagbI2YZw";

const center = [-74.00597, 40.71427];
const zoom = 10;
const accountId = context.accountId;

const questions = [
  { key: 1, value: "How would you recognize someone from your borough?" },
  { key: 2, value: "What's a popular dish?" },
  { key: 3, value: "Name a famous landmark." },
  { key: 4, value: "What's some slang from your neighborhood?" },
  { key: 5, value: "What are the top 3 destinations?" },
  { key: 6, value: "What are people most likely doing on a Saturday?" },
  { key: 7, value: "What are you most likely to see on the train?" },
  { key: 8, value: "How do people say goodbye?" },
  { key: 9, value: "What’s the first thing a stranger asks when visiting?" },
  { key: 10, value: "Where do the locals go?" },
];

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: var(--header-height);
  height: calc(100vh - 70px);
  align-items: stretch;
  flex-direction: column;
  overflow: auto;
  position: relative;
  z-index: 100;
`;

const Button = styled.button`
  background: #191a1a;
  border-radius: 6px;
  color: white;
  z-index: 1;
  padding: 10px 22px;
`;

const Profile = styled.div`
  position: absolute;
  right: 50px;
  top: 30px;
  @media (max-width: 510px) {
    padding: 6px 15px;
    right: 15px;
    top: 15px;
  }
`;

const Inspect = styled.div`
  position: absolute;
  left: 50px;
  top: 30px;
  @media (max-width: 510px) {
    padding: 6px 15px;
    right: 15px;
    top: 15px;
  }
`;

const Location = styled.div`
  position: absolute;
  bottom: 50px;
  @media (max-width: 510px) {
    padding: 6px 15px;
    bottom: 15px;
  }
`;

const markers = Social.get(`*/thing/libertyMarker`, "final", {
  subscribe: "true",
});

if (!markers) {
  return <></>;
}

const dataMap = {};

Object.keys(markers).forEach((accountId) => {
  if (markers[accountId].thing && markers[accountId].thing.libertyMarker) {
    const markerObj = JSON.parse(markers[accountId].thing.libertyMarker);
    dataMap[accountId] = { accountId, ...markerObj };
  }
});

State.init({
  locations: [],
  edit: false,
  currentLocation: (dataMap[accountId] && dataMap[accountId].coordinates) || {},
});

const handleSave = (data) => {
  if (!data) {
    data = dataMap[accountId].data;
  }
  Social.set(
    {
      thing: {
        libertyMarker: {
          "": JSON.stringify({
            coordinates: state.currentLocation,
            data,
          }),
        },
      },
    },
    {
      onCommit: () => {
        State.update({ edit: false, showForm: false, showInspect: false });
      },
      onCancel: () =>
        State.update({ edit: false, showForm: false, showInspect: false }),
    }
  );
};

function DownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 48 48"
    >
      <mask id="ipSDownOne0">
        <path
          fill="#fff"
          stroke="#fff"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M36 19L24 31L12 19h24Z"
        />
      </mask>
      <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSDownOne0)" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M13 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" />
        <path d="M17.5 9.5c0 3.038-2 6.5-5.5 10.5c-3.5-4-5.5-7.462-5.5-10.5a5.5 5.5 0 1 1 11 0Z" />
      </g>
    </svg>
  );
}

return (
  <Container>
    {/* Absolute Positioning */}
    <Profile>
      <Button
        onClick={() => {
          State.update({ showForm: !state.showForm });
        }}
      >
        {`What's your Borough?`}
        <DownIcon />
      </Button>
    </Profile>
    {accountId && state.showForm && (
      <Widget
        src={"libertydao.near/widget/boroughs.form"}
        props={{
          data: (dataMap[accountId] && dataMap[accountId].data) || {},
          handleSave,
          questions,
        }}
      />
    )}

    {state.showInspect && (
      <Widget
        src={"libertydao.near/widget/boroughs.inspect"}
        props={{
          focusedMarker: state.focusedMarker,
          questions,
        }}
      />
    )}

    {/* Absolute Positioning */}
    {accountId && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Location>
          <Button
            onClick={
              state.edit
                ? () => handleSave()
                : () => State.update({ edit: !state.edit, showForm: true })
            }
          >
            {`${!state.edit ? "Mark your Borough!" : "Save"}`}
            <LocationIcon />
          </Button>
          {state.edit && (
            <Button
              onClick={() => State.update({ edit: false, showForm: false })}
            >
              Cancel
            </Button>
          )}
        </Location>
      </div>
    )}

    <Widget
      src={"libertydao.near/widget/boroughs.map"}
      props={{
        API_URL,
        accessToken: MAP_TOKEN,
        styleUrl: MAP_STYLE,
        center,
        zoom,
        markers: Object.values(dataMap),
        edit: state.edit,
        onMapClick: (e) => {
          State.update({ currentLocation: e.coordinates, showInspect: false });
        },
        onMarkerClick: (e) => {
          State.update({ focusedMarker: e, showInspect: true });
        },
      }}
    />
  </Container>
);
