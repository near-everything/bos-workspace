const onOpenFile = props.onOpenFile;

State.init({
  path: "",
});

return (
  <div className="container">
    <div className="mb-3">
      <label htmlFor="path">Path</label>
      <input
        name="path"
        id="path"
        value={state.path}
        onChange={(e) => State.update({ path: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="blockHeight">Block Height</label>
      <input
        name="blockHeight"
        id="blockHeight"
        type="number"
        value={state.blockHeight}
        onChange={(e) => State.update({ blockHeight: e.target.value })}
      />
    </div>
    <button onClick={() => onOpenFile(state.path, state.blockHeight)}>
      Open File
    </button>
  </div>
);
