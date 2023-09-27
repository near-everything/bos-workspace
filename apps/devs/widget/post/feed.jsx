const { Feed } = VM.require("devs.near/widget/Module.Feed");
const { ContextMenu } = VM.require("efiz.near/widget/Module.ContextMenu");
const { Modal } = VM.require("devs.near/widget/Module.Modal");

ContextMenu = ContextMenu || (() => <></>); // make sure you have this or else it can break
Feed = Feed || (() => <></>);
Modal = Modal || (() => <></>);

const [open, setOpen] = useState(false);
const [modalContent, setModalContent] = useState(null);

const handleOpen = (isOpen, content) => {
  setOpen(isOpen);
  setModalContent(content);
};

return (
  <div
    className="d-flex flex-column gap-1"
    style={{
      background: "#fefefe",
      padding: "23px",
    }}
  >
    <h3>
      <b>Every Post</b>
    </h3>
    <Widget
      src="devs.near/widget/Compose"
      // props={{
      //   index: {
      //     post: JSON.stringify([
      //       {
      //         key: {
      //           type: "post",
      //           path: `${creatorId}/thing/${groupId}`,
      //         },
      //         value: {
      //           type: "md",
      //         },
      //       },
      //     ]),
      //   },
      // }}
    />
    <Feed
      index={[
        {
          action: "post",
          key: "main",
          options: {
            limit: 10,
            order: "desc",
            accountId: props.accounts,
          },
          cacheOptions: {
            ignoreCache: true,
          },
        },
        {
          action: "repost",
          key: "main",
          options: {
            limit: 10,
            order: "desc",
            accountId: props.accounts,
          },
          cacheOptions: {
            ignoreCache: true,
          },
        },
      ]}
      Item={(p) => {
        const item = {
          type: "social",
          path: `${p.accountId}/post/main`,
          blockHeight: p.blockHeight,
        };

        return (
          <ContextMenu
            Item={() => (
              <Widget
                loading={<div className="w-100" style={{ height: "200px" }} />}
                src="mob.near/widget/MainPage.N.Post" // Fork and edit this
                props={{
                  accountId: p.accountId,
                  blockHeight: p.blockHeight,
                }}
              />
            )}
            passProps={{
              // PROPS THAT WILL BE PASSED TO FUNCTION
              show: {
                item,
              },
            }}
            handlers={{
              // FUNCTION DEFINITIONS
              show: ({ item }) => {
                const data = {
                  index: {},
                };
                const notifications = ["james.near"].map((accountId) => ({
                  key: accountId,
                  value: {
                    type: "mention",
                    item,
                  },
                }));

                data.index.notify = JSON.stringify(
                  notifications.length > 1 ? notifications : notifications[0]
                );

                if (notifications.length) {
                  // Social.set(data);
                }
              },
            }}
            items={{
              // MENU ITEM TO RENDER, WILL CALL FUNCTION WHEN CLICKED
              show: () => (
                <div
                  onClick={() =>
                    handleOpen(
                      true,
                      () => <Widget src="devs.near/widget/action.show" />
                    )
                  }
                >
                  <i className="menu__item__icon bi bi-arrow-return-right" />
                  Forward
                </div>
              ),
            }}
          />
        );
      }}
    />
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <div>{modalContent}</div>
    </Modal>
  </div>
);
