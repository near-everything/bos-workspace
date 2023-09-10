const styles = {
  formrow: {
    marginBottom: "32px",
  },
  label: {
    display: "block",
    color: "#fff",
    fontSize: "16px",
    position: "relative",
    paddingRight: "5px",
    marginBottom: "10px",
  },
  textbox: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    border: "2px solid rgba(255, 255, 255, 0.8)",
    minHeight: "46px",
    color: "#fff",
    fontSize: "14px",
    borderRadius: "1000px",
    width: "100%",
    padding: "0px 11px",
    marginBottom: "10px",
  },
  textarea: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    minHeight: "100px",
    color: "#fff",
    fontSize: "14px",
    borderRadius: "6px",
    width: "100%",
    padding: "4px 11px",
    resize: "none",
  },
  contentdiv: {
    padding: "32px",
    background: "#29244e",
    borderRadius: "0px 0px 10px 10px",
  },
  pagename: {
    color: "#fff",
    padding: "16px",
    fontSize: "22px",
    backgroundColor: "#231D4B",
    fontWeight: 600,
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
  },
  formwrap: {
    background: "#29244e",
    maxWidth: "700px",
    margin: "16px auto",
    borderRadius: "10px",
  },
  btnrow: {
    display: "flex",
    justifyContent: "center",
  },
  btnback: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "16px",
    padding: "5px 16px",
    fontWeight: 400,
    background: "none",
    backgroundColor: "rgba(60, 53, 109, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
    height: "40px",
    borderRadius: "40px",
    lineHeight: "29px",
    letterSpacing: "0.01em",
    display: "flex",
    alignItems: "center",
  },

  btn: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "16px",
    padding: "5px 16px",
    fontWeight: 400,
    background: "none",
    backgroundImage:
      "linear-gradient(145deg, #016EDA, #6C1ECF, #016EDA, #6C1ECF)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
    height: "40px",
    borderRadius: "40px",
    lineHeight: "29px",
    letterSpacing: "0.01em",
    display: "flex",
    alignItems: "center",
    marginLeft: "16px",
    justifyContent: "center",
    maxWidth: "200px",
  },
};

return (
  <>
    <div style={styles.formwrap}>
      <div style={styles.pagename}></div>

      <div style={styles.contentdiv}>
        <div style={styles.formrow}>
          <label style={styles.label}>Borough name*</label>
          <input style={styles.textbox} name="myInput" />
        </div>
        <div style={styles.formrow}>
          <label style={styles.label}>Borough Description*</label>
          <input style={styles.textbox} name="myInput" />
        </div>
        <div style={styles.formrow}>
          <label style={styles.label}>
            Three ways you would Describe someone from your Borough
          </label>
          <input
            style={styles.textbox}
            placeholder={"Description 1"}
            name="myInput"
          />
          <input
            style={styles.textbox}
            placeholder={"Description 2"}
            name="myInput"
          />
          <input
            style={styles.textbox}
            placeholder={"Description 3"}
            name="myInput"
          />
        </div>

        <div style={styles.btnrow}>
          <input style={styles.btn} type="submit" value="Submit" />
        </div>
      </div>
    </div>
  </>
);



/**const accountId = context.accountId;
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

// Borough Name
// Description
// How would you recognize someone from your borough?

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
);**/
