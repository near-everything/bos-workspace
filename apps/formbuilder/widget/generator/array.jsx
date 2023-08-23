const ArrayGenerator = ({
  fieldSchema,
  displayDetails,
  errors,
  data,
  onChange,
}) => {
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
      const newArray = data[key].filter((item) => item !== v);
      onChange(key, newArray);
    }
  };

  const initialArray = data[key] || fieldSchema.defaultValue || [];
  if (initialArray.length === 0) {
    if (typeof fieldSchema.itemTypes[0] === "string") {
      // this could be improved
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
          <Widget
            src="efiz.near/widget/generator.thing"
            props={{
              key: `${key}[${index}]`,
              fieldSchema:
                typeof fieldSchema.itemTypes[0] === "string"
                  ? {
                      type: fieldSchema.itemTypes[0],
                      defaultValue: item,
                    }
                  : { ...fieldSchema.itemTypes[0], defaultValue: item },
              displayDetails: displayDetails.properties[key],
              errors,
              data,
              onChange,
            }}
          />
          <button onClick={() => handleRemoveArrayItem(key, item)}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={() => handleAddArrayItem(key)}>Add</button>
    </div>
  );
};

return ArrayGenerator(props);
