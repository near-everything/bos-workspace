function ThingGenerator({
  key,
  fieldSchema,
  displayDetails,
  errors,
  data,
  onChange,
}) {
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
    // return renderArrayField(key, fieldSchema, displayDetails);
    return (
      <Widget
        src="efiz.near/widget/generator.array"
        props={{ key, fieldSchema, displayDetails, errors, data, onChange }}
      />
    );
  } else if (fieldSchema.type && fieldSchema.type.properties) {
    return (
      <div key={key} className="border p-2">
        <label>{displayDetails.label}</label>
        <div>
          {/** This is like a repeat of generator.core */}
          {Object.keys(fieldSchema.type.properties).map((subKey) => (
            <Widget
              src="efiz.near/widget/generator.thing"
              props={{
                key: `${key}.${subKey}`,
                fieldSchema: fieldSchema.type.properties[subKey],
                displayDetails: displayDetails.properties
                  ? displayDetails.properties[subKey]
                  : {},
                errors,
                data,
                onChange,
              }}
            />
          ))}
        </div>
        {displayDetails.description && <p>{displayDetails.description}</p>}
      </div>
    );
  }
  if (debug) {
    console.log("field not rendered: " + key);
  }
  return <p>hello</p>;
}

return ThingGenerator(props);
