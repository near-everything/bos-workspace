/**
 * To Do
 * Check if policies get updated for different dao
 * Check if gas is right amount
 * Error happening inside of funcition call
 * can propose is not updating correctly
 */
const nearContract = "nft.genadrop.near";
const nft_gas = 200000000000000;
const nft_deposit = 10000000000000000000000;
const proposal_gas = 219000000000000;
const method_name = "nft_mint";
const daoId = props.daoId ?? "drop.sputnik-dao.near";
const nearOnly = true;
let accountId = context.accountId;
const contractAddresses = {
  0: [nearContract, "Near"],
};
const chains = [
  {
    id: "0",
    name: "Near",
    url: "https://ipfs.near.social/ipfs/bafkreigv55ubnx3tfhbf56toihekuxvgzfqn5c3ndbfjcg3e4uvaeuy5cm",
  },
];

const proposalKinds = {
  ChangeConfig: "config",
  ChangePolicy: "policy",
  AddMemberToRole: "add_member_to_role",
  RemoveMemberFromRole: "remove_member_from_role",
  FunctionCall: "call",
  UpgradeSelf: "upgrade_self",
  UpgradeRemote: "upgrade_remote",
  Transfer: "transfer",
  SetStakingContract: "set_vote_token",
  AddBounty: "add_bounty",
  BountyDone: "bounty_done",
  Vote: "vote",
  FactoryInfoUpdate: "factory_info_update",
  ChangePolicyAddOrUpdateRole: "policy_add_or_update_role",
  ChangePolicyRemoveRole: "policy_remove_role",
  ChangePolicyUpdateDefaultVotePolicy: "policy_update_default_vote_policy",
  ChangePolicyUpdateParameters: "policy_update_parameters",
};

const actions = {
  AddProposal: "AddProposal",
  VoteApprove: "VoteApprove",
  VoteReject: "VoteReject",
  VoteRemove: "VoteRemove",
};

// -- Get all the roles from the DAO policy
let roles = Near.view(daoId, "get_policy");
const daoBond = roles.proposal_bond;

roles = roles === null ? [] : roles.roles;
// state update roles
const isUserAllowedTo = (roles, user, kind, action) => {
  // -- Filter the user roles
  const userRoles = [];
  for (const role of roles) {
    if (role.kind === "Everyone") {
      userRoles.push(role);
      continue;
    }
    if (!role.kind.Group) continue;
    if (user && role.kind.Group && role.kind.Group.includes(user)) {
      userRoles.push(role);
    }
  }

  // -- Check if the user is allowed to perform the action
  let allowed = false;

  userRoles
    .filter(({ permissions }) => {
      const allowedRole =
        permissions.includes(`${kind.toString()}:${action.toString()}`) ||
        permissions.includes(`${kind.toString()}:*`) ||
        permissions.includes(`*:${action.toString()}`) ||
        permissions.includes("*:*");
      allowed = allowed || allowedRole;
      return allowedRole;
    })
    .map((role) => role.name);
    console.log("inside is user allowed to")

  return allowed;
};

const canPropose = isUserAllowedTo(
  state.roles ?? roles,
  context.accountId,
  proposalKinds.FunctionCall,
  actions.AddProposal
); // logic not working for some reason
console.log(
  "Can Propose Function call  for " +daoId + " |  " + context.accountId + " " + canPropose
);
// move this to helper function

// Helper Functions
const showAlertMessage = (message) => {
  State.update({
    showAlert: true,
    toastMessage: message,
  });
  setTimeout(() => {
    State.update({ showAlert: false });
  }, 3000);
};

const updateUserArgs = () => {
  if (!state.image.cid) {
    return;
  }
  if (!accountId) {
    showAlertMessage("Please log in before continuing");
  } else if (!state.title) {
    showAlertMessage("Please enter a title for the NFT");
  } else if (!state.description) {
    showAlertMessage("Please enter a description for the NFT");
  } else {
    const metadata = {
      name: state.title,
      description: state.description,
      properties: [],
      image: `ipfs://${state.image.cid}`,
    };
    console.log("come", metadata);
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: metadata,
    }).then((res) => {
      console.log("GO ON SOUN", res);
      const cid = res.body.cid;
      const gas = nft_gas;
      const deposit = nft_deposit;
      console.log("State Image CID: " + state.image.cid);
      console.log("Reference CID: " + cid);
      const post_args = JSON.stringify({
        token_id: `${Date.now()}`,
        metadata: {
          title: state.title,
          description: state.description,
          media: `https://ipfs.io/ipfs/${state.image.cid}`,
          reference: `ipfs://${cid}`,
        },
        receiver_id: state.recipient,
      });
      console.log("Post args: " + post_args);
      const proposal_args = Buffer.from(post_args, "utf-8").toString("base64");
      State.update({
        proposal_args,
      });
    });
  }
  console.log("Should be end of update userArgs");
};

const proposeMint = () => {
  Near.call([
    {
      contractName: state.daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "create proposal to mint NFT",
          kind: {
            FunctionCall: {
              receiver_id: nearContract,
              actions: [
                {
                  method_name: method_name,
                  args: state.proposal_args,
                  deposit: "10000000000000000000000",
                  gas: "" + nft_gas,
                  receiver_id: `${state.recipient ?? context.accountId}`,
                },
              ],
            },
          },
        },
      },
      deposit: state.daoBond ?? daoBond,
      gas: "" + proposal_gas,
    },
  ]);
};
const handleMint = () => {
  if (!state.image.cid) {
    return;
  }
  if (!accountId) {
    showAlertMessage("Please log in before continuing");
  } else if (!state.title) {
    showAlertMessage("Please enter a title for the NFT");
  } else if (!state.description) {
    showAlertMessage("Please enter a description for the NFT");
  } else {
    const metadata = {
      name: state.title,
      description: state.description,
      properties: [],
      image: `ipfs://${state.image.cid}`,
    };
    console.log("come", metadata);
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: metadata,
    }).then((res) => {
      console.log("GO ON SOUN", res);
      const cid = res.body.cid;
      const gas = 200000000000000;
      const deposit = 10000000000000000000000;
      console.log("State Image CID: " + state.image.cid);
      console.log("Reference CID: " + cid);
      Near.call([
        {
          contractName: "nft.genadrop.near",
          methodName: method_name,
          args: {
            token_id: `${Date.now()}`,
            metadata: {
              title: state.title,
              description: state.description,
              media: `https://ipfs.io/ipfs/${state.image.cid}`,
              reference: `ipfs://${cid}`,
            },
            receiver_id: state.recipient,
          },
          gas: gas,
          deposit: deposit,
        },
      ]);
    });
  }
};

State.init({
  title: "",
  description: "",
  recipient: context.accountId,
  isSoulBound: false,
  showAlert: false,
  toastMessage: "",
  selectIsOpen: false,
  selectedChain: "0",
  daoId: daoId,
  daoBond: daoBond,
  roles: roles,
  canPropose: canPropose,
  proposal_args: null,
});

//select tag
const handleSelectClick = () => {
  State.update({
    selectIsOpen: !state.selectIsOpen,
  });
};

// const handleOptionClick = (option) => {
//   setSelectedOption(option);
//   setIsOpen(false);
// };

const handleOutsideClick = (e) => {
  if (!e.target.closest(".select-replica__select")) {
    State.update({
      selectIsOpen: false,
    });
  }
};

const onChangeTitle = (title) => {
  console.log("onChange title: " + title);
  State.update({
    title,
  });
  updateUserArgs();
};

const data = Social.keys("*/profile", "final");

if (!data) {
  return "Loading";
}

const accounts = Object.entries(data);

const allWidgets = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];
  allWidgets.push(accountId);
}

const onChangeRecipient = (recipient) => {
  state.selectedChain === "0"
    ? State.update({
        recipient: recipient[0],
      })
    : State.update({
        recipient,
      });
  updateUserArgs();
};
const onChangeDAO = (daoId) => {
  // add policy change and all this logic
  let roles = Near.view(daoId, "get_policy");
  const daoBond = roles.proposal_bond;
  roles = roles === null ? [] : roles.roles;
  const canPropose = isUserAllowedTo(
    roles,
    context.accountId,
    proposalKinds.FunctionCall,
    actions.AddProposal
  ); // logic not working for some reason
  console.log(
    "Can Propose Function call for " +
      daoId +
      " inside onchangedao " +
      context.accountId +
      " " +
      canPropose
  );
  State.update({
    daoId,
    roles,
    canPropose,
    daoBond,
  });
};

const handleChainChange = (chain_id) => {
  console.log(
    "get what we doing:",
    chain_id || "no value from event?",
    chain_id == "0",
    !accountId
  );
  if (chain_id == "0") {
    if (!accountId) {
      console.log("not what we thought,:", accountId);
      State.update({
        showAlert: true,
        toastMessage: "Please log in before continuing",
      });
      return;
    }
    State.update({
      selectedChain: chain_id,
    });
  }
  console.log("encts here", Ethers.send);
  Ethers.send("wallet_switchEthereumChain", [
    {
      chainId: "0x" + Number(chain_id).toString(16),
    },
  ]).then((data) => console.log("done!!!", data));
  console.log("what happens after");
  State.update({
    selectedChain: chain_id,
  });
  console.log("afters", state.selectedChain);
};

const onChangeDesc = (description) => {
  console.log("Log ciritcal critics:", state.selectedChain, state.title);
  State.update({
    description,
  });
  updateUserArgs();
};

const handleToggle = () => {
  State.update({
    isSoulBound: !state.isSoulBound,
  });
};
// if (state.sender === undefined) {
//   console.log("of course it's undefined", ethers);
//   const accounts = Ethers.send("eth_requestAccounts", []);
//   console.log("account", accounts);
//   if (accounts.length) {
//     State.update({ sender: accounts[0] });
//     console.log("set sender", accounts[0]);
//   }
// }

const Heading = styled.p`
  margin: 3rem auto 0px auto;
  font-size: 1em;
  color:#0f1d40;
  line-height:2.1rem;
  width:60%;
  text-align: center;
  font-family: "SF Pro Display",sans-serif;
`;
const SubHeading = styled.p`
  margin: 0 auto 3px auto;
  font-size: 1em;
  color:#0f1d40;
  line-height:1.4rem;
  width:60%;
  text-align: center;
  font-family: "SF Pro Display",sans-serif;
`;

const ImageUploadCard = styled.div`
display:flex;
flex-flow: column nowrap;
align-items: center;
  width:80%;
  border: 2px dashed #0d99ff;
  border-radius: 1rem;
  box-shadow: 4px 4px 20px 6px rgba(0,0,0,.2);
  margin:30px auto;
  padding:1.5rem;
  text-align: center;
`;

const Main = styled.div`
  display: grid;
  gap: 3rem;
  align-content:center;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  margin-top: 5px;
  width:100%;
  padding: 1rem;
  .button{
    padding: .75em 2em;
    border-radius: .7em;
    border: 1px solid #0d99ff;
    transition: all .3s;
    cursor: pointer;
    color: #fff;
    background: #0d99ff;
    &:hover{
        color: #0d99ff;
        background:#fff;
    }
  @media screen and (max-width: 540px){
      padding: .5em 2em;    
      }
  }
`;

const Text = styled.p`
font-size: .9rem;
color: #525c76;
line-height:1.rem;
margin: 3px;
`;

const Elipse = styled.div`
background-color:#dff3f9;
height: 100px;
width: 100px;
border-radius: 50%;
`;

const Card = styled.div`
padding: 1em;
border: 1px solid #e5e8eb;
gap: 2em;
margin: 10px auto;
border-radius: .7em;
& input{
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
  box-shadow:none;
    border:1px solid #0d99ff;
  }
  &::placeholder {
    color: palevioletred;
  }
  }
  .soulbound{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const ImageCard = styled.div`
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  height:100%;
  max-height:100%;
  width: 90%;
  max-width: 500px;
  border-radius: 1rem;
  &>img{
  object-fit: cover;
  width: 100%;
  height: 100%;
  }
`;

const Input = styled.input`
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
    border:1px solid #0d99ff;
  }
  ::placeholder {
    color: palevioletred;
  }
`;

const TextArea = styled.textarea`
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
    border:1px solid #0d99ff;
  }
`;

const SelectTag = styled.select`
  height: fit-content;
  width: 300px;
`;

const ChainIcon = styled.option`
  display: flex;
  height: 130px;
  padding: 1rem auto;
  &>img{
    height:100px;
    width: 100px;
    object-fit: contain;
  }
`;

const SelectReplicaContainer = styled.div`
  position: relative;
  display: inline-block;
  background-color: #fff;
  z-index: 1;
  & .select-replica__select {
    position: relative;
  }

  & .select-replica__selected {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: 3px;
    border: 1px solid #ccc;
    gap: 10px;
    border-radius: 4px;
    background-color: #fff;
    width: 200px;
    & > img {
      height: 100%;
      width: 100px;
      object-fit: contain;
    }
  }

  & .select-replica__options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    /* height: fit-content; */
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    background-color: #fff;
    max-height: 250px;
    display: none;
  }

  & .select-replica__options.open {
    display: block;
  }

  & .select-replica__option {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #fff;
    padding: 3px;
    border-bottom: 1px solid gray;
  }

  & .select-replica__option.selected {
    background-color: #f0f0f0;
  }

  & .select-replica__option img {
    height: 60px;
    width: 100px;
    object-fit: contain;
  }
`;

const SelectGroup = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 1rem;
  margin: 2rem auto;
`;

const ToggleButton = styled.div`
   /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
} 
`;

console.log(
  "Here 🤔 " +
    state.selectedChain +
    " " +
    chains
      .filter((chain) => {
        return state.selectedChain.toString() == chain.id;
      })
      .map((c) => c.url)
);

return (
  <>
    {state.showAlert && (
      <Widget src="jgodwill.near/widget/genalert" props={state} />
    )}
    <Heading className="text-center fs-2 fw-bold">
      Mint NFT / DAO Propose on NEAR
    </Heading>

    <Main className="container-fluid">
      {!state.image.cid ? (
        <div className="flex-grow-1">
          <SubHeading>Upload an image to create an NFT on NEAR</SubHeading>
          <ImageUploadCard className="flex-grow-1">
            <Elipse />
            <>
              <IpfsImageUpload
                image={state.image}
                className="btn text-decoration-none link-primary pe-auto"
              />
              <div>
                <Text>
                  We support .jpg, .jpeg, .png, .svg files and mint to Near
                </Text>
              </div>
            </>
          </ImageUploadCard>
        </div>
      ) : (
        <>
          <Card className="d-flex flex-column align-items-center w-100">
            <div>
              <IpfsImageUpload
                image={state.image}
                onChange={() => updateUserArgs()}
                className="btn btn-outline-primary border-0 rounded-3"
              />
            </div>
            <ImageCard>
              <img
                src={`https://ipfs.io/ipfs/` + state.image.cid}
                alt="uploaded image"
                width="100%"
                height="100%"
                className="rounded-3"
              />
            </ImageCard>
          </Card>
          <div>
            <Card>
              <Card>
                Title:
                <Input
                  type="text"
                  value={state.title || ""}
                  onChange={(e) => onChangeTitle(e.target.value)}
                />
              </Card>
              <Card>
                Description:
                <TextArea
                  type="text"
                  value={state.description || ""}
                  onChange={(e) => onChangeDesc(e.target.value)}
                />
              </Card>
              <Card>
                Propose to Mint To:
                <Typeahead
                  id="async-example"
                  className="type-ahead"
                  isLoading={isLoading}
                  labelKey="search"
                  minLength={1}
                  options={allWidgets}
                  onChange={(value) => onChangeRecipient(value)}
                  placeholder={
                    state.selectedChain == "0" ? accountId : state.sender
                  }
                />
              </Card>
              <Card>
                DAO to Propose to Mint
                <Typeahead
                  id="async-example"
                  className="type-ahead"
                  isLoading={isLoading}
                  labelKey="search"
                  minLength={1}
                  options={allWidgets}
                  onChange={(value) => onChangeDAO(value)}
                  placeholder={state.daoId}
                />
              </Card>
            </Card>
            <button
              type="button"
              className="btn btn-primary d-flex flex-column align-items-center mx-auto"
              onClick={handleMint}
            >
              Mint to {contractAddresses[state.selectedChain][1]}
            </button>
            {(true || state.canPropose) && state.proposal_args ? (
              <button
                type="button"
                className="btn btn-primary d-flex flex-column align-items-center mx-auto"
                onClick={state.canPropose === true ? proposeMint : null}
              >
                {state.canPropose === true ? "" : "Cannot "}Propose to Mint to
                NEAR to {state.daoId ?? daoId}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-danger d-flex flex-column align-items-center mx-auto"
              >
                Finish User Args To Propose to Mint to NEAR to{" "}
                {state.daoId ?? daoId}
              </button>
            )}
          </div>
        </>
      )}
    </Main>
    <Widget src="jgodwill.near/widget/GenaDrop.Footer" />
  </>
);