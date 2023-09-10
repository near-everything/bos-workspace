const Owner =
  "819c44a1bdd666dce2119a6e92f9d7643136e02fc577e6cd0542bb38f6172b4a";
const API_URL = "https://humans.nearverselabs.com/api";
const MAP_STYLE = "mapbox://styles/mapbox/streets-v12";
const MAP_TOKEN =
  "pk.eyJ1IjoidGVqMDEiLCJhIjoiY2xqcHZ2dGpkMDB5azNsbzQ0bmMwNjRjaCJ9.FVv2zRPaLwzZMgagbI2YZw";

const center = [-74.00597, 40.71427];
const zoom = 8.9;
const accountId = context.accountId;

//Styles

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 190px);
  align-items: stretch;
  flex-direction: column;
  background: black;
  overflow: auto;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  position: absolute;
`;

const Profile = styled.button`
  background: #191a1a;
  right: 50px;
  top: 30px;
  padding: 10px 22px;
  @media (max-width: 510px) {
    padding: 6px 15px;
    right: 15px;
    top: 15px;
  }
`;

const Location = styled.button`
  background: unset;
  bottom: 50px;
  padding: 10px 22px;
  @media (max-width: 510px) {
    padding: 6px 15px;
    bottom: 15px;
  }
`;

const BtnStyle = {
  borderRadius: "6px",
  border: "1px solid rgb(255, 255, 255)",
  color: "white",
  position: "absolute",
  zIndex: 1,
};

const BtnStyle2 = {
  background: "white",
  borderRadius: "6px",
  border: "1px solid rgb(255, 255, 255)",
  color: "#191a1a",
  position: "absolute",
  zIndex: 1,
};

const getMyData = () => {
  return asyncFetch(API_URL + `/auth/account?accountId=${accountId}`).then(
    (res) => {
      if (res.ok) {
        return res.body.user;
      }
    }
  );
};

const getLocations = () => {
  return asyncFetch(API_URL + `/location`).then((res) => {
    if (res.ok) {
      return res.body;
    }
  });
};

const getMyInfor = async () => {
  getMyData().then((user) => {
    State.update({
      user,
    });
  });
};

const getLocationsData = async () => {
  getLocations().then((data) => {
    State.update({
      locations: data,
    });
  });
};

const onClose = () => {
  State.update({ showModal: false });
};

const onHumanClose = () => {
  State.update({ humanAlert: false });
};

const handleSaveLocation = () => {
  asyncFetch(`${API_URL}/location/bos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accountId }),
  }).then((res) => {
    State.update({ edit: !state.edit });
  });
};

getMyInfor();
getLocationsData();

return (
  <Wrapper>
    <Header>
      <Widget src={`${Owner}/widget/Header`} />
    </Header>

    <div>
      <Profile
        class="btn"
        style={BtnStyle}
        onClick={() => {
          State.update({ showModal: true });
        }}
      >
        {`Form`}
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
              stroke-linejoin="round"
              stroke-width="4"
              d="M36 19L24 31L12 19h24Z"
            />
          </mask>
          <path
            fill="currentColor"
            d="M0 0h48v48H0z"
            mask="url(#ipSDownOne0)"
          />
        </svg>
      </Profile>
    </div>

    {accountId && hasSBTToken && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Location
          class="btn"
          style={state.edit ? BtnStyle2 : BtnStyle}
          onClick={handleSaveLocation}
        >
          {`${!state.edit ? "Edit" : "Save"} location`}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M13 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" />
              <path d="M17.5 9.5c0 3.038-2 6.5-5.5 10.5c-3.5-4-5.5-7.462-5.5-10.5a5.5 5.5 0 1 1 11 0Z" />
            </g>
          </svg>
        </Location>
      </div>
    )}

    {accountId && hasSBTToken && state.showModal && (
      <Widget
        src={`${Owner}/widget/Modal`}
        props={{ onClose, API_URL, user: state.user, getMyInfor }}
      />
    )}

    {accountId && !hasSBTToken && state.humanAlert && (
      <Widget
        src={`${Owner}/widget/HumanAlert`}
        props={{ onClose: onHumanClose }}
      />
    )}

    <Widget
      src={`${Owner}/widget/Mapbox`}
      props={{
        API_URL,
        accessToken: MAP_TOKEN,
        styleUrl: MAP_STYLE,
        center,
        zoom,
        markers: state.locations,
        edit: state.edit,
      }}
    />
  </Wrapper>
);
