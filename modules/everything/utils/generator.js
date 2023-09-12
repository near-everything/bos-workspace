const Creator = ({ typeDef, displayInfo, errors, data, onChange, debug }) => {
  const handleArrayItemChange = (key, index, value) => {
    const newArray = [...(data[key] || [])];
    newArray[index] = value;
    onChange(key, newArray);
  };

  const handleAddArrayItem = (key) => {
    const newArray = [...(data[key] || []), null]; // I wonder if this could use getDefaultForPrimitive
    onChange(key, newArray);
  };

  const handleRemoveArrayItem = (key, v) => {
    if (data[key].length > 1) {
      const newArray = data[key].filter(item => item !== v);
      onChange(key, newArray);
    }
  };

  // I think this is forcing rerender too much.
  const renderArrayField = (key, fieldSchema, displayDetails) => {
    const initialArray = data[key] || fieldSchema.defaultValue || [];
    if (initialArray.length === 0) {
      if (typeof fieldSchema.itemTypes[0] === "string") { // this could be improved
        // just have it be that if there is one length, then push one of that type. Otherwise.
        initialArray.push("");
      } else {
        initialArray.push(null);
      }
    }

    return (
      <div key={key}>
        <label>{displayDetails.label || key}</label>
        {initialArray.map((item, index) => (
          <div key={`${key}[${index}]`}>
            {fieldSchema.itemTypes.length > 1 ? (
              <select
                onChange={(e) =>
                  handleArrayItemChange(key, index, e.target.value)
                }
              >
                {fieldSchema.itemTypes.map((type, typeIndex) => (
                  // Need to do something onChange
                  <option
                    key={typeIndex}
                    value={type}
                    onChange={(e) => {
                      console.log("selected " + e.target.value);
                    }}
                  >
                    {typeof type === "string" ? type : type.type}
                  </option>
                ))}
              </select>
            ) : null}
            {renderField(
              `${key}[${index}]`,
              // should be the selected type
              typeof fieldSchema.itemTypes[0] === "string"
                ? {
                    type: fieldSchema.itemTypes[0],
                    defaultValue: item,
                  }
                : { ...fieldSchema.itemTypes[0], defaultValue: item },
              displayDetails.properties[key]
            )}
            <button onClick={() => handleRemoveArrayItem(key, item)}>
              Remove
            </button>
          </div>
        ))}
        <button onClick={() => handleAddArrayItem(key)}>Add</button>
      </div>
    );
  };

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
