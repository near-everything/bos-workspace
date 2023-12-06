/**
 * TODO: Change index key to project
 * // provide option to filter by user curation
 * // Social.get
 */

const Flex = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;

  flex-wrap: wrap;
`;

const { Feed } = VM.require("efiz.near/widget/Module.Feed");
const { Card } = VM.require("discover.near/widget/project.module");

if (!Feed || !Card) {
  return <div>Loading modules...</div>;
}

return (
  <>
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
          <div key={p}>
            <Widget
              src="discover.near/widget/project.provider"
              props={{ View: Card, projectId: p.value.id, creatorId: p.accountId }}
            />
          </div>
        );
      }}
      Layout={Flex}
    />
  </>
);
