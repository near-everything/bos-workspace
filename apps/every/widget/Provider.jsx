const Children = props.Children;
/**
 * LAYER ONE
 *
 * Holds mappings, gathers the necessary data, takes in a thing and compiles it
 * It's almost like the bundler
 *
 */

const things = {
  1: {
    type: "document",
  },
  2: {
    type: "document",
  },
};

const types = {
  document: {
    type: "string",
  },
};
const templates = {
  document: "every.near/widget/document.template",
};

const plugins = {
  document: "every.near/widget/document.plugin",
};

return (
  <>
    <Children
      things={things}
      types={types}
      templates={templates}
      plugins={plugins}
      {...props}
    />
  </>
);
