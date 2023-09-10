const accountId = context.accountId;
if (!accountId) return;

const SOCIAL = "https://social.near.page/u/";
const TWITTER = "https://twitter.com/";

const { API_URL, onClose, user, getMyInfor } = props;

State.init({
  social: user.social,
  twitter: user.twitter,
  name: user.name,
});

const ModalOverlay = styled.div`
  position: absolute;
  right: 50px;
  top: 80px;
  background-color: #191a1a;
  border-radius: 12px;
  border: 1px solid rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  z-index: 100;
  width: 400px;
  @media (max-width: 510px) {
    right: 10px;
    top: 54px;
    width: 96%;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  width: 100%;
  color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap:5px;
`;

const ModalAction = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const ModalTitle = styled.h4`
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 22px;
  background-color:white;
  color: #191a1a;
  border-radius: 6px;
  &:hover {
    background-color: grey;
    color: #191a1a;
  }
  &:active {
    background-color: grey;
    color: #191a1a;
  }
`;

const TextField = styled.input`
padding: 10px 15px;
font-size: 16px;
border-radius: 6px;
border: 2px solid rgb(255, 255, 255);
background-color: #191a1a;
color: white;
`;

const saveMyProfile = () => {
  const data = {
    accountId,
    name: state.name,
    social: state.social,
    twitter: state.twitter,
  };

  return asyncFetch(API_URL + `/auth/account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      getMyInfor();
      onClose();
    }
  });
};

const changeName = async (e) => {
  if (e.target.value.length <= 25)
    State.update({
      ...state,
      name: e.target.value,
    });
};

const changeSocial = async (e) => {
  if (e.target.value.indexOf(SOCIAL) === 0)
    State.update({
      ...state,
      social: e.target.value,
    });
};

const changeTwitter = async (e) => {
  if (e.target.value.indexOf(TWITTER) === 0)
    State.update({
      ...state,
      twitter: e.target.value,
    });
};

return (
  <ModalOverlay>
    <ModalContent>
      <button
        style={{
          width: 40,
          position: "absolute",
          right: 25,
          background: "unset",
          borderColor: "white",
        }}
        onClick={onClose}
      >
        X
      </button>
      <ModalTitle>{`Your Profile`}</ModalTitle>
      <p>{`Be careful with your public data.`}</p>
      <h5>{`Display Name`}</h5>
      <TextField
        type="text"
        placeholder={accountId}
        value={state.name}
        onChange={changeName}
      />
      <h5>{`Near Social`}</h5>
      <TextField
        type="text"
        placeholder="Near Social"
        value={state.social}
        onChange={changeSocial}
      />
      <h5>{`Twitter`}</h5>
      <TextField
        type="text"
        placeholder="Twitter Link"
        value={state.twitter}
        onChange={changeTwitter}
      />
    </ModalContent>
    <ModalAction>
      <Button className="btn" onClick={saveMyProfile}>{`Save`}</Button>
    </ModalAction>
  </ModalOverlay>
);
