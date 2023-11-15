const accountId = context.accountId;

const homepage = Social.get(`${accountId}/settings/discover.bos/homepage`);

if (homepage === null) {
  return "loading...";
}

State.init({
  homepage: homepage ?? "itexpert120-contra.near/widget/DefaultHomepage",
});

return <Widget src={state.homepage} />;
