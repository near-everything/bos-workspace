const path = props.path;
const blockHeight = props.blockHeight || "final";

const jThing = Social.getr(path, blockHeight);

const jType = Social.get(jThing.type, "final");

const jWidget = Social.get(jThing.template.src, "final");

if (!jThing || !jType || !jWidget) {
  return <></>;
}

const files = [
  {
    path: props.path,
    language: "json",
    code: JSON.stringify(jThing, null, 2),
  },
  {
    path: jThing.type,
    language: "json",
    code: JSON.stringify(JSON.parse(jType), null, 2),
  },
  {
    path: jThing.template.src,
    language: "javascript",
    code: jWidget,
  },
];

return (
  <Widget
    src={"itexpert120-contra.near/widget/Editor"}
    props={{
      files,
    }}
  />
);
