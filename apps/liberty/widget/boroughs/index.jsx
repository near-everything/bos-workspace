const MAP_STYLE = "mapbox://styles/mapbox/streets-v12";
const MAP_TOKEN =
  "pk.eyJ1IjoidGVqMDEiLCJhIjoiY2xqcHZ2dGpkMDB5azNsbzQ0bmMwNjRjaCJ9.FVv2zRPaLwzZMgagbI2YZw";

const center = [-74.00597, 40.71427];
const zoom = 10;
const accountId = context.accountId;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 120px);
  align-items: stretch;
  flex-direction: column;
  background: black;
  overflow: auto;
  position: relative;
`;

const Button = styled.button`
  background: #191a1a;
  border-radius: 6px;
  border: 1px solid rgb(255, 255, 255);
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

const markers = Social.get(`*/thing/libertyMarkerTest`, "final", {
  subscribe: "true",
});

if (!markers) {
  return <></>;
}

function extractCoordinates(data) {
  const coordinatesMap = {};

  Object.keys(data).forEach((accountId) => {
    if (data[accountId].thing && data[accountId].thing.libertyMarkerTest) {
      const coordinates = JSON.parse(
        data[accountId].thing.libertyMarkerTest
      ).coordinates;
      coordinatesMap[accountId] = { accountId, coordinates };
    }
  });

  return coordinatesMap;
}

State.init({
  locations: [],
  edit: false,
});

const onClose = () => {
  State.update({ showForm: false });
};

let currentLocation = {};

function setCurrentLocation(coordinates) {
  currentLocation = coordinates;
}

function setFocusedMarker(marker) {
  State.update({ focusedMarker: marker, showInspect: true });
}

const handleSaveLocation = () => {
  Social.set(
    {
      thing: {
        libertyMarkerTest: {
          "": JSON.stringify({ coordinates: currentLocation }),
          metadata: {
            name: "",
            description: "",
            image: "",
            backgroundImage: "",
          },
        },
      },
    },
    {
      onCommit: () => {
        State.update({ edit: !state.edit });
      },
      onCancel: () => State.update({ edit: !state.edit }),
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
  <Wrapper>
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
      <Widget src={"libertydao.near/widget/boroughs.form"} />
    )}

    {state.showInspect && (
      <Widget
        src={"libertydao.near/widget/boroughs.inspect"}
        props={{ data: state.focusedMarker }}
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
                ? handleSaveLocation
                : () => State.update({ edit: !state.edit })
            }
          >
            {`${!state.edit ? "Edit" : "Save"} location`}
            <LocationIcon />
          </Button>
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
        markers: Object.values(extractCoordinates(markers)),
        edit: state.edit,
        onMapClick: (e) => {
          setCurrentLocation(e.coordinates);
          State.update({ showInspect: false });
        },
        onMarkerClick: (e) => {
          setFocusedMarker(e);
        },
      }}
    />
  </Wrapper>
);
