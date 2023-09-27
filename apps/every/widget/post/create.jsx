const { Thing } = VM.require("efiz.near/widget/Module.Thing");

Thing = Thing || (() => <></>);

State.init({
  count: 0,
});

return (
  <>
    <button onClick={() => State.update({ count: state.count + 1 })}>up</button>
    <p>{state.count}</p>
    <Thing path={"efiz.near/thing/core"} blockHeight="final" />
  </>
);

// return <Widget src="devs.near/widget/Compose" props={{ index }} />;
