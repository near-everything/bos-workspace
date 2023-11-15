const accountId = context.accountId;
const daoId = props.daoId;
const newEvent = props.event;

if (!accountId) {
  return "No Account ID passed";
}

const policy = Near.view(daoId, "get_policy");
const deposit = policy.proposal_bond;
const event_args = JSON.stringify({
  data: {
    [daoId]: {
      event: {
        [newEvent.data.id]: newEvent,
      },
    },
  },
});

const proposal_args = Buffer.from(event_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "proposing an event",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "80000000000000000000000",
                  gas: "300000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: "300000000000000",
    },
  ]);
};

return (
  <>
    <button
      className="w-100 btn btn-primary"
      disabled={daoId === ""}
      onClick={handleProposal}
    >
      Propose Event
    </button>
  </>
);
