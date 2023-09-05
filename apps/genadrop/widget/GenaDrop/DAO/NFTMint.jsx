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

// Helper Functions
function showAlertMessage(message) {
  State.update({
    showAlert: true,
    toastMessage: message,
  });
  setTimeout(() => {
    State.update({ showAlert: false });
  }, 3000);
}

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
  proposal_args: null,
  image: null,
});

// -- Get all the roles from the DAO policy
const roles = Near.view(state.daoId, "get_policy");
const daoBond = roles.proposal_bond;
roles = roles ? roles.roles : [];

const isUserAllowedTo = (roles, user, kind, action) => {
  // Filter the user roles
  const userRoles = roles.filter((role) => {
    if (role.kind === "Everyone") return true;
    return role.kind.Group && role.kind.Group.includes(user);
  });

  // Check if the user is allowed to perform the action
  const allowed = userRoles.some(({ permissions }) => {
    return (
      permissions.includes(`${kind}:${action}`) ||
      permissions.includes(`${kind}:*`) ||
      permissions.includes(`*:${action}`) ||
      permissions.includes("*:*")
    );
  });

  return allowed;
};

const canPropose = isUserAllowedTo(
  roles,
  context.accountId,
  proposalKinds.FunctionCall,
  actions.AddProposal
);

console.log(
  "Can Propose Function call  for " +
    daoId +
    " |  " +
    context.accountId +
    " " +
    canPropose
);

function prepareMetadata(callback) {
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
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: metadata,
    }).then((res) => {
      const cid = res.body.cid;

      console.log("State Image CID: " + state.image.cid);
      console.log("Reference CID: " + cid);

      const metadata = {
        token_id: `${Date.now()}`,
        metadata: {
          title: state.title,
          description: state.description,
          media: `https://ipfs.io/ipfs/${state.image.cid}`,
          reference: `ipfs://${cid}`,
        },
        receiver_id: state.recipient,
      };
      callback(metadata);
    });
  }
}

const handlePropose = () => {
  prepareMetadata((metadata) => {
    const proposal_args = Buffer.from(
      JSON.stringify(metadata),
      "utf-8"
    ).toString("base64");
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
                    args: proposal_args,
                    deposit: "10000000000000000000000",
                    gas: "" + nft_gas,
                    receiver_id: `${state.recipient ?? context.accountId}`,
                  },
                ],
              },
            },
          },
        },
        deposit: daoBond,
        gas: "" + proposal_gas,
      },
    ]);
  });
};

const handleMint = () => {
  prepareMetadata((metadata) => {
    Near.call([
      {
        contractName: "nft.genadrop.near",
        methodName: method_name,
        args: metadata,
        gas: gas,
        deposit: deposit,
      },
    ]);
  });
};

function getAccountsWithProfile() {
  const data = Social.keys("*/profile", "final");

  if (!data) {
    return "Loading";
  }

  const accounts = Object.entries(data);

  const allProfiles = [];

  for (let i = 0; i < accounts.length; ++i) {
    const accountId = accounts[i][0];
    allProfiles.push(accountId);
  }
  return allProfiles;
}

const onChangeRecipient = (recipient) => {
  State.update({
    recipient: state.selectedChain === "0" ? recipient[0] : recipient,
  });
};

const Heading = styled.p`
  margin: 3rem auto 0px auto;
  font-size: 1em;
  color: #0f1d40;
  line-height: 2.1rem;
  width: 60%;
  text-align: center;
  font-family: "SF Pro Display", sans-serif;
`;
const SubHeading = styled.p`
  margin: 0 auto 3px auto;
  font-size: 1em;
  color: #0f1d40;
  line-height: 1.4rem;
  width: 60%;
  text-align: center;
  font-family: "SF Pro Display", sans-serif;
`;

const ImageUploadCard = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 80%;
  border: 2px dashed #0d99ff;
  border-radius: 1rem;
  box-shadow: 4px 4px 20px 6px rgba(0, 0, 0, 0.2);
  margin: 30px auto;
  padding: 1.5rem;
  text-align: center;
`;

const Main = styled.div`
  display: grid;
  gap: 3rem;
  align-content: center;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  margin-top: 5px;
  width: 100%;
  padding: 1rem;
  .button {
    padding: 0.75em 2em;
    border-radius: 0.7em;
    border: 1px solid #0d99ff;
    transition: all 0.3s;
    cursor: pointer;
    color: #fff;
    background: #0d99ff;
    &:hover {
      color: #0d99ff;
      background: #fff;
    }
    @media screen and (max-width: 540px) {
      padding: 0.5em 2em;
    }
  }
`;

const Text = styled.p`
  font-size: 0.9rem;
  color: #525c76;
  line-height: 1rem;
  margin: 3px;
`;

const Elipse = styled.div`
  background-color: #dff3f9;
  height: 100px;
  width: 100px;
  border-radius: 50%;
`;

const Card = styled.div`
  padding: 1em;
  border: 1px solid #e5e8eb;
  gap: 2em;
  margin: 10px auto;
  border-radius: 0.7em;
  & input {
    display: block;
    padding: 0.5em;
    width: 100%;
    border: 1px solid #e5e8eb;
    border-radius: 10px;
    outline: none;
    background: #f4f5f6;
    color: #525c76;
    :focus {
      box-shadow: none;
      border: 1px solid #0d99ff;
    }
    &::placeholder {
      color: palevioletred;
    }
  }
  .soulbound {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const ImageCard = styled.div`
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  height: 100%;
  max-height: 100%;
  width: 90%;
  max-width: 500px;
  border-radius: 1rem;
  & > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Input = styled.input`
  display: block;
  padding: 0.5em;
  width: 100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus {
    border: 1px solid #0d99ff;
  }
  ::placeholder {
    color: palevioletred;
  }
`;

const TextArea = styled.textarea`
  display: block;
  padding: 0.5em;
  width: 100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus {
    border: 1px solid #0d99ff;
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
                  onChange={(e) =>
                    State.update({
                      title: e.target.value,
                    })
                  }
                />
              </Card>
              <Card>
                Description:
                <TextArea
                  type="text"
                  value={state.description || ""}
                  onChange={(e) =>
                    State.update({ description: e.target.value })
                  }
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
                  options={getAccountsWithProfile()}
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
                  options={getAccountsWithProfile()}
                  onChange={(value) => State.update({ daoId: value[0] })}
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
            {(true || canPropose) && state.title && state.description ? (
              <button
                type="button"
                className="btn btn-primary d-flex flex-column align-items-center mx-auto"
                onClick={handlePropose}
                disabled={!canPropose}
              >
                {`${canPropose ? "" : "Cannot "}Propose to Mint to NEAR to ${
                  state.daoId
                }`}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-danger d-flex flex-column align-items-center mx-auto"
              >
                {`Finish User Args To Propose to Mint to NEAR to ${state.daoId}`}
              </button>
            )}
          </div>
        </>
      )}
    </Main>
    <Widget src="jgodwill.near/widget/GenaDrop.Footer" />
  </>
);
