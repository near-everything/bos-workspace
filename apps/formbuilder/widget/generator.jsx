const Creator = ({ typeDef, displayInfo, errors, data, onChange }) => {
  const handleArrayItemChange = (key, index, value) => {
    const newArray = [...(data[key][""] || [])];
    newArray[index] = value;
    onChange(key, { ...data[key], "": newArray });
  };

  const handleAddArrayItem = (key) => {
    const newArray = [...(data[key][""] || [])];
    const newItem = typeof fieldSchema.itemTypes[0] === "string" ? "" : {};
    newItem._id = Date.now(); // Generate a unique ID based on the current timestamp
    newArray.push(newItem);
    onChange(key, { ...data[key], "": newArray });
  };
  const handleRemoveArrayItem = (key, v) => {
    const newArray = data[key][""].filter((item) => item !== v);
    onChange(key, { ...data[key], "": newArray });
  };

  function ArrayField({ key, fieldSchema, displayDetails }) {
    const initialArray = data[key][""] || [];
    return (
      <div key={key}>
        <label>{displayDetails.label || key}</label>
        {initialArray.map((item, index) => (
          <div key={`${key}[${item._id || index}]`}>
            <Field
              key={`${key}[${index}]`}
              fieldSchema={fieldSchema.itemTypes[0]}
              displayDetails={displayDetails}
              data={item}
              onChange={(value) => handleArrayItemChange(key, index, value)}
            />
            <button onClick={() => handleRemoveArrayItem(key, item)}>
              Remove
            </button>
          </div>
        ))}
        <button onClick={() => handleAddArrayItem(key)}>Add</button>
      </div>
    );
  }

  // Configuration object
  const widgetConfigurations = {
    string: {
      src: "nui.sking.near/widget/Input.ExperimentalText",
      defaultProps: {
        size: "md",
        inputProps: {
          type: "text",
        },
      },
    },
    boolean: {
      src: "nui.sking.near/widget/Input.Checkbox",
      defaultProps: {},
    },
    number: {
      src: "nui.sking.near/widget/Input.ExperimentalText",
      defaultProps: {
        size: "md",
        inputProps: {
          type: "number",
        },
      },
    },
    date: {
      src: "nui.sking.near/widget/Input.ExperimentalText",
      defaultProps: {
        size: "md",
        inputProps: {
          type: "date",
        },
      },
    },
    md: {
      src: "nui.sking.near/widget/Input.ExperimentalText",
      defaultProps: {
        size: "md",
      },
    },
  };

  function Field({ key, fieldSchema, displayDetails, data, onChange }) {
    // Look up the widget configuration based on the field type
    const widgetConfig = widgetConfigurations[fieldSchema.type];

    if (widgetConfig) {
      const { src, defaultProps } = widgetConfig;

      // Merge default props with display details and other props
      const mergedProps = {
        ...defaultProps,
        label: displayDetails.label,
        placeholder: displayDetails.placeholder ?? "",
        inputProps: {
          ...defaultProps.inputProps,
          name: key,
          defaultValue: data,
        },
        onChange: onChange,
      };

      return (
        <div key={key}>
          <Widget src={src} props={mergedProps} />
        </div>
      );
    }
    if (fieldSchema.type && fieldSchema.type.properties) {
      return (
        <div key={key} className="border p-2">
          <label>{displayDetails.label}</label>
          <div>
            {Object.keys(fieldSchema.type.properties).map((subKey) => (
              <Field
                key={`${key}.${subKey}`}
                fieldSchema={fieldSchema.type.properties[subKey]}
                displayDetails={
                  displayDetails.properties
                    ? displayDetails.properties[subKey]
                    : {}
                }
                data={data[subKey][""]}
                onChange={(value) =>
                  onChange(subKey, { ...data[subKey], "": value })
                }
              />
            ))}
          </div>
          {displayDetails.description && <p>{displayDetails.description}</p>}
        </div>
      );
    }
    switch (fieldSchema.type) {
      case "array":
        return (
          <ArrayField
            key={key}
            fieldSchema={fieldSchema}
            displayDetails={displayDetails}
            data={data}
            onChange={onChange}
          />
        );

      case "object":
        return (
          <div key={key} className="border p-2">
            <label>{displayDetails.label}</label>
            <div>
              {Object.keys(fieldSchema).map((subKey) => {
                if (subKey !== "type") {
                  return (
                    <Field
                      key={`${key}.${subKey}`}
                      fieldSchema={fieldSchema[subKey]}
                      displayDetails={displayDetails[subKey] || {}}
                      data={data[subKey][""]}
                      onChange={(value) =>
                        onChange(subKey, { ...data[subKey], "": value })
                      }
                    />
                  );
                }
                return null;
              })}
            </div>
            {displayDetails.description && <p>{displayDetails.description}</p>}
          </div>
        );
    }
    if (props.debug) {
      console.log(fieldSchema.type);
    }
  }

  return (
    <div>
      {Object.keys(typeDef.properties).map((key) => (
        <Field
          key={key}
          fieldSchema={typeDef.properties[key]}
          displayDetails={displayInfo.properties[key]}
          data={data[key][""]}
          onChange={(value) => onChange(key, { ...data[key], "": value })}
        />
      ))}
    </div>
  );
};

return Creator(props);
