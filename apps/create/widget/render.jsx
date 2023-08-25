// --------------------------------------------------------
// Takes a Markdown string and renders it to HTML.
// --------------------------------------------------------

const content = props.content;

return (
  <div className="container">
    <Widget
      src="openwebbuild.near/widget/Post.Markdown"
      props={{
        text: props.content,
      }}
    />
  </div>
);
