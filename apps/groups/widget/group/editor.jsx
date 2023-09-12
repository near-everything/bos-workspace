const creatorId = props.creatorId ?? context.accountId;
const groupId = props.groupId;

if (!creatorId) {
  return "Please connect your NEAR account :)";
}

State.init({
  groupId,
  group,
});

return (
  <>
    <div className="row">
      <div className="col-lg-6 mt-2">
        <div className="mb-3">
          <h5>Details</h5>
          <input
            style={{ fontSize: "15px" }}
            onChange={(e) => State.update({ groupId: e.target.value })}
          />
        </div>
        <Widget
          src="hack.near/widget/group.card"
          props={{ creatorId, groupId, group: state.group }}
        />
        <div className="mb-2 mt-3">
          <Widget
            src="near/widget/MetadataEditor"
            props={{
              initialMetadata: group,
              onChange: (group) => State.update({ group }),
              options: {
                name: { label: "Name" },
                image: { label: "Logo" },
                description: { label: "About" },
                tags: {
                  label: "Tags",
                  tagsPattern: `*/${groupId}/tags/*`,
                  placeholder: "art, gov, edu, dev, com, nft, ai, social",
                },
                linktree: {
                  links: [
                    {
                      label: "Twitter",
                      prefix: "https://twitter.com/",
                      name: "twitter",
                    },
                    {
                      label: "Github",
                      prefix: "https://github.com/",
                      name: "github",
                    },
                    {
                      label: "Telegram",
                      prefix: "https://t.me/",
                      name: "telegram",
                    },
                    {
                      label: "Website",
                      prefix: "https://",
                      name: "website",
                    },
                  ],
                },
              },
            }}
          />
        </div>
        <div className="mb-2">
          <CommitButton
            data={{ thing: { group: { [`${groupId}`]: state.group } } }}
          >
            update
          </CommitButton>
          <a
            className="btn btn-primary ms-2"
            href={`#/hack.near/widget/group?creatorId=${creatorId}&groupId=${groupId}`}
          >
            view
          </a>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="m-2">
          <Widget
            src="hack.near/widget/group.save"
            props={{ creatorId, groupId: state.groupId }}
          />
        </div>
      </div>
    </div>
  </>
);