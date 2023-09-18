const accountId = context.accountId;
if (!accountId) return;

const { onClose } = props;

const styles = {
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
    width: "100%",
  },
};

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
  gap: 5px;
`;

const ModalAction = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
`;

const ModalTitle = styled.h4`
  margin-bottom: 10px;
`;

const saveMyProfile = () => {
  const data = {
    name: state.name,
    social: state.description,
    answer1: state.answer1,
    answer2: state.answer2,
    answer3: state.answer3,
  };

  Social.set({
    thing: {
      libertyMarkerTest: {
        "": JSON.stringify(data),
      },
    },
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
      <ModalTitle>What's your Borough?</ModalTitle>
      <div style={styles.formrow}>
        <label style={styles.label}>Borough name*</label>
        <input
          style={styles.textbox}
          onChange={(v) => State.update({ name: v.target.value })}
        />
      </div>
      <div style={styles.formrow}>
        <label style={styles.label}>Borough Description*</label>
        <input
          style={styles.textbox}
          onChange={(v) => State.update({ description: v.target.value })}
        />
      </div>
      <div style={styles.formrow}>
        <label style={styles.label}>
          Three ways you would Describe someone from your Borough
        </label>
        <input
          style={styles.textbox}
          placeholder={"Description 1"}
          onChange={(v) => State.update({ answer1: v.target.value })}
        />
        <input
          style={styles.textbox}
          placeholder={"Description 2"}
          onChange={(v) => State.update({ answer2: v.target.value })}
        />
        <input
          style={styles.textbox}
          placeholder={"Description 3"}
          onChange={(v) => State.update({ answer3: v.target.value })}
        />
      </div>
    </ModalContent>
    <ModalAction>
      <button style={styles.btn} onClick={saveMyProfile}>
        Save
      </button>
    </ModalAction>
  </ModalOverlay>
);
