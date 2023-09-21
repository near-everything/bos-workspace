const accountId = props.accountId ?? context.accountId;
const groupId = props.groupId ?? "f8ad9d1a76259lmdpjnd74e69162a0a014";
const creatorId = props.creatorId ?? "hack.near";

// We get all of the groups that have been indexed
const groups = Social.index("every", "group", { limit: 10 });

// TODO: We can put an infinite scroll for groups
// And then we could do a Social.get([...groups]) constructed from each index

if (!groups) {
  return "";
}

// we check if they are a member ? Do we need this here?
// Ohhhh you join everyone
const isMember = Social.keys(
  `${accountId}/graph/${groupId}/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const type = join ? "leave" : "join";

const handleJoin = () => {
  Social.set({
    graph: { [groupId]: { [accountId]: "" } },
    index: {
      graph: JSON.stringify({
        key: groupId,
        value: {
          type,
          accountId,
        },
      }),
      notify: JSON.stringify({
        key: creatorId, // in that case, who should the creator be?
        value: {
          type,
          accountId,
          message: "everyone is growing!",
        },
      }),
    },
  });
};

const GroupCard = styled.div`
  flex-basis: calc(33.33% - 20px);
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;

  @media (hover: none) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const { Feed } = VM.require("efiz.near/widget/Module.Feed");
Feed = Feed || (() => <></>);

const Header = styled.div`
  background: black;
`;

const Container = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  height: 100vh;
  margin-top: var(--header-height);
`;

const ActivityContainer = styled.div`
  overflow-y: scroll;
`;

const Left = styled.div`
  padding: 20px;
  background: #f8f8f9;
  flex: 3;
`;

const Center = styled.div`
  flex: 9;
`;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 20px 0;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
`;

return (
  <Container>
    <Left>
      <button
        onClick={() => State.update({ showModal: true })}
        className="btn btn-success"
      >
        create
      </button>
      <Widget src={"libertydao.near/widget/initiatives.list"} />
    </Left>
    <Center>
      {state.groupId && state.creatorId ? (
        <Widget
          src={"libertydao.near/widget/initiatives.page"}
          props={{
            creatorId: state.creatorId,
            groupId: state.groupId,
          }}
        />
      ) : (
        <CardWrapper>
          <Feed
            index={{
              action: "every",
              key: "group",
              options: {
                limit: 10,
                order: "desc",
                accountId: undefined,
              },
            }}
            Item={(p) => {
              return (
                <Widget
                  key={p}
                  src={"libertydao.near/widget/initiatives.card"}
                  props={{
                    creatorId: p.accountId,
                    groupId: p.value.id,
                    onClick: () => State.update({ creatorId: p.accountId, groupId: p.value.id }),
                  }}
                />
              );
            }}
            Layout={Grid}
          />
        </CardWrapper>
      )}
    </Center>
    {state.showModal && (
      <Widget
        src={"libertydao.near/widget/initiatives.create"}
        props={{
          handleClose: () => State.update({ showModal: false }),
        }}
      />
    )}
  </Container>
);
