const content = fetch(`https://raw.githubusercontent.com/${props.path}`);

if (content === null) return "";

return (
  <Widget src="create.near/widget/render" props={{ content: content.body }} />
);
