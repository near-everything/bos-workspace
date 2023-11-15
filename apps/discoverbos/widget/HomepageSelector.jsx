const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to edit your homepage";
}

const defaultHomepage = "devs.near/widget/Home";

const homepage = Social.get(`${accountId}/settings/discover.bos/homepage`);

if (homepage === null) {
  return "Loading";
}

initState({
  homepage: homepage ?? defaultHomepage,
});

const resetHomepage = () => {
  state.homepage = defaultHomepage;
  State.update();
};

return (
  <div>
    <div>
      <h4>Edit your homepage</h4>
    </div>
    <div className="mb-2">
      Widget:
      <input type="text" value={state.homepage} placeholder={defaultHomepage} />
    </div>
    <div className="mb-2">
      <CommitButton
        data={{ settings: { "discover.bos": { homepage: state.homepage } } }}
      >
        Save homepage
      </CommitButton>
      {state.homepage !== defaultHomepage && (
        <button
          className="btn btn-outline-primary ms-2"
          onClick={resetHomepage}
        >
          Reset homepage
        </button>
      )}
      {homepage === state.homepage && (
        <a className="btn btn-outline-primary ms-2" href={`/`}>
          Open homepage
        </a>
      )}
    </div>
    <hr />
    <div className="mb-2">
      <Widget src={state.homepage} />
    </div>
  </div>
);
