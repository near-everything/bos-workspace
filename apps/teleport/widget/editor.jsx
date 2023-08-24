
let timeoutId;

const debounce = (func, delay) => {
  if (!delay) {
    delay = 300;
  }
  clearTimeout(timeoutId);
  timeoutId = setTimeout(func, delay);
};

return (
  <Widget
    key={"left"}
    src="efiz.near/widget/MonacoEditor"
    props={{
      language: "json",
      path: "left",
      code: state.uidl,
      onChange: debounce((v) => State.update({ uidl: v })),
      height: "80%",
    }}
  />
);
