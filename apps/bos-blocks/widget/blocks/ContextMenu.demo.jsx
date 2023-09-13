const propsTable = `

| Prop Name       | Type/Values     | Default Value  | Description                                        |
|-----------------|-----------------|----------------|----------------------------------------------------|
| ${"`Item`"}         | Function/ReactNode            | ${"`N/A`"}            | The item that, when right clicked, will trigger menu.                          |
| ${"`passProps`"}      | Object          | ${"`N/A`"}            | The props that will be passed to handler function of the same key.                     |
| ${"`handlers`"}  | Object        | ${"`N/A`"}            | An object with function definitions that will be called when the item of the same key is clicked.           |
| ${"`items`"}| Object        | ${"`N/A`"}            | An object for displaying the menu items; key corresponds with the handler and passProps to call when clicked.          |
`;

const widgetCode = `
\`\`\`jsx
const { ContextMenu } = VM.require("efiz.near/widget/Module.ContextMenu");

ContextMenu = ContextMenu || (() => <></>); // make sure you have this or else it can break

return (
  <ContextMenu
    Item={() => (
      // YOUR ITEM THAT, WHEN RIGHT CLICKED, WILL TRIGGER MENU
      <div style={{ height: "200px", width: "200px" }}>
        <p>right click me</p>
      </div>
    )}
    passProps={{
      // PROPS THAT WILL BE PASSED TO FUNCTION
      doSomething: { message: "hello world" },
    }}
    handlers={{
      // FUNCTION DEFINITIONS
      doSomething: ({ message }) => {
        console.log(message);
      },
    }}
    items={{
      // MENU ITEM TO RENDER, WILL CALL FUNCTION WHEN CLICKED
      doSomething: () => (
        <>
          <i className="menu__item__icon bi bi-x-lg" />
          Do Something
        </>
      ),
    }}
  />
);
\`\`\`
`;

const { ContextMenu } = VM.require("efiz.near/widget/Module.ContextMenu");

ContextMenu = ContextMenu || (() => <></>);

return (
  <div className="d-flex flex-column gap-1 pb-4">
    <Widget
      src={"nearui.near/widget/Typography.Text"}
      props={{
        children: "Preview",
        tag: "h2",
        size: "4",
        weight: "bold",
        color: "default",
        className: "mt-4 mb-2",
      }}
    />
    <div
      className="d-flex flex-column gap-1"
      style={{
        background: "#fefefe",
        border: "1px solid #ccc",
        padding: "24px",
        borderRadius: "12px",
      }}
    >
      <ContextMenu
        Item={() => (
          <div
            style={{
              height: "200px",
              width: "200px",
              border: "2px dashed black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFEBE8",
            }}
          >
            <p>right click me</p>
          </div>
        )}
        passProps={{
          doSomething: { message: "hello world" },
        }}
        handlers={{
          doSomething: ({ message }) => {
            console.log(message);
          },
        }}
        items={{
          doSomething: () => (
            <>
              <i className="menu__item__icon bi bi-x-lg" />
              do Something
            </>
          ),
        }}
      />
    </div>
    <Widget
      src={`nearui.near/widget/Typography.Text`}
      props={{
        children: "Usage",
        tag: "h2",
        size: "4",
        weight: "bold",
        color: "default",
        className: "mt-4 mb-2",
      }}
    />
    <Markdown text={widgetCode} />
    <Widget
      src={`nearui.near/widget/Typography.Text`}
      props={{
        children: "Properties",
        tag: "h2",
        size: "4",
        weight: "bold",
        color: "default",
        className: "mt-4 mb-2",
      }}
    />
    <Markdown text={propsTable} />
  </div>
);
