// Kinda wanna call this the Creator
// It doesn't use State, I bet we could make it into a module.
const Generator = ({ typeDef, displayInfo, errors, data, onChange }) => {
  const renderField = (key, fieldSchema, displayDetails) => {
    if (fieldSchema.type === "string") {
      return (
        <div key={key}>
          <Widget
            src={
              displayDetails.template ??
              "nui.sking.near/widget/Input.ExperimentalText"
            }
            props={{
              label: displayDetails.label,
              placeholder: displayDetails.placeholder ?? "",
              size: "md",
              inputProps: {
                name: key,
                defaultValue: fieldSchema.defaultValue,
              },
              error: errors[key],
              onChange: (v) => onChange(key, v),
            }}
          />
        </div>
      );
    } else if (fieldSchema.type === "boolean") {
      return (
        <div key={key}>
          <Widget
            src={
              displayDetails.template ?? "nui.sking.near/widget/Input.Checkbox"
            }
            props={{
              label: displayDetails.label ?? key,
              onChange: (checked) => {
                onChange(key, checked);
              },
              checked: data[key] ?? fieldSchema.defaultValue,
            }}
          />
        </div>
      );
    } else if (fieldSchema.type === "number") {
      return (
        <div key={key}>
          <Widget
            src={
              displayDetails.template ??
              "nui.sking.near/widget/Input.ExperimentalText"
            }
            props={{
              label: displayDetails.label ?? key,
              placeholder: displayDetails.placeholder,
              size: displayDetails.size ?? "md",
              inputProps: {
                type: "number",
                min: fieldSchema.min, // fix
                max: fieldSchema.max, //fix
                name: key,
                defaultValue: fieldSchema.defaultValue,
              },
              error: errors[key],
              onChange: (v) => onChange(key, v),
            }}
          />
        </div>
      );
    } else if (fieldSchema.type === "date") {
      return (
        <div key={key}>
          <Widget
            src={
              displayDetails.template ??
              "nui.sking.near/widget/Input.ExperimentalText"
            }
            props={{
              label: displayDetails.label ?? key,
              placeholder: displayDetails.placeholder,
              size: displayDetails.size ?? "md",
              inputProps: {
                type: "date",
                min: fieldSchema.min, // fix
                max: fieldSchema.max, //fix
                name: key,
                defaultValue: fieldSchema.defaultValue,
              },
              error: errors[key],
              onChange: (v) => onChange(key, v),
            }}
          />
        </div>
      );
    } else if (fieldSchema.type === "array") {
      // This can be a separate widget
      return renderArrayField(key, fieldSchema, displayDetails);
    } else if (fieldSchema.type && fieldSchema.type.properties) {
      return (
        <div key={key} className="border p-2">
          <label>{displayDetails.label}</label>
          <div>
            {Object.keys(fieldSchema.type.properties).map((subKey) =>
              renderField(
                `${key}.${subKey}`,
                fieldSchema.type.properties[subKey],
                displayDetails.properties
                  ? displayDetails.properties[subKey]
                  : {}
              )
            )}
          </div>
          {displayDetails.description && <p>{displayDetails.description}</p>}
        </div>
      );
    }
    if (debug) {
      console.log("field not rendered: " + key);
    }
    return <p>hello</p>;
  };

  // Default Creator
  if (Object.keys(typeDef.properties).length === 0) {
    // const path = props.path;
    // const code = props.code;
    // const language = props.language;
    // const onChange = props.onChange;
    return (
      <Widget
        src="efiz.near/widget/MonacoEditor"
        props={{ code: data, language: "javascript" }}
      />
    );
  }
  return (
    <div>
      {Object.keys(typeDef.properties).map((key) =>
        renderField(key, typeDef.properties[key], displayInfo.properties[key])
      )}
    </div>
  );
};

return Generator(props);
