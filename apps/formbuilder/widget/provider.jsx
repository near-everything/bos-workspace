/*__@import:everything/utils/typeToEmptyData__*/
/*__@import:everything/utils/debounce__*/
/*__@import:everything/utils/generator__*/

const typeDef = {
  properties: {
    name: {
      type: "string",
      defaultValue: "a",
      enum: ["a", "b", "c"],
      validation: {
        required: false,
        min: 0,
        max: 10,
        pattern: "",
      },
    },
    isHappy: {
      type: "boolean",
      defaultValue: true,
    },
    bio: {
      type: "md",
      defaultValue: "## Markdown Content\n\nThis is a sample markdown content.",
      validation: {
        required: false,
        min: 0,
        max: 500,
      },
    },
    favoriteNumber: {
      type: "number",
      defaultValue: 10,
      enum: [10, 20, 30],
      validation: {
        min: 0,
        max: 100,
      },
    },
    address: {
      type: {
        properties: {
          street: {
            type: "string",
            validation: {
              required: true,
            },
            defaultValue: "street",
          },
          city: {
            type: "string",
            validation: {
              required: true,
            },
            defaultValue: "city",
          },
        },
      },
      validation: {
        required: false,
      },
    },
    dateOfBirth: {
      type: "date",
      defaultValue: "2023-08-10",
      validation: {
        min: "2019-08-13",
        max: "2023-08-13",
      },
    },
    links: {
      type: "array",
      itemTypes: [
        {
          type: "string",
          validation: {
            min: 0,
            max: 20,
            pattern: "https://",
          },
        },
        "efiz.near/type/github",
      ],
      defaultValue: ["item1", "item2", "item3"],
      validation: {
        min: 0,
        max: 10,
        uniqueItems: true,
      },
    },
  },
};

const displayInfo = {
  properties: {
    name: {
      label: "Full Name",
      description: "Your complete name as on official documents.",
      placeholder: "John Doe",
      template: "nui.sking.near/widget/Input.ExperimentalText",
    },
    isHappy: {
      label: "Happiness Status",
      description: "Tell us if you're feeling happy today!",
    },
    bio: {
      label: "Biography",
      description: "A short description about yourself.",
      placeholder: "I am a...",
    },
    favoriteNumber: {
      label: "Favorite Number",
      description: "Pick your favorite number from the list.",
    },
    address: {
      label: "Address (Home)",
      description: "The home you live in",
      properties: {
        street: {
          label: "Street Name",
          description: "The street where your house is located.",
        },
        city: {
          label: "City",
          description: "The city where you reside.",
        },
      },
    },
    dateOfBirth: {
      label: "Date of Birth",
      description: "Your birth date.",
    },
    links: {
      label: "Links",
      description: "List of your favorite links.",
    },
  },
};

const data = typeToEmptyData(typeDef);

function flattenData(data, parentKey, result) {
  if (!parentKey) {
    parentKey = "";
  }
  if (!result) {
    result = {};
  }
  Object.keys(data).forEach((key) => {
    let newKey = parentKey ? `${parentKey}.${key}` : key;

    if (
      typeof data[key] === "object" &&
      data[key] !== null &&
      !Array.isArray(data[key])
    ) {
      flattenData(data[key], newKey, result);
    } else if (Array.isArray(data[key])) {
      data[key].forEach((item, index) => {
        flattenData(item, `${newKey}[${index}]`, result);
      });
    } else {
      result[newKey] = data[key];
    }
  });
  return result;
}

data = flattenData(data);

State.init({ ...data, errors: [] });

function handleSubmit() {
  validate(typeDef, state.data);
}

const set = (k, v) => State.update({ [k]: v });
const get = (k) => state[k];
const store = (k, v) => Storage.privateSet(k, v);
const retrieve = (k) => Storage.privateGet(k);

function onChange(path, value) {
  console.log("path: " + path + ", value: " + value);
  debounce(() => State.update({ [path]: value }));

  // // Split the path into its components (e.g., "address.street" becomes ["address", "street"])
  // const keys = path.split('.');

  // // Use a recursive function to navigate through the state and update the value
  // function setValue(obj, keys, value) {
  //   let key = keys[0];

  //   // Check if the key has an array index, e.g., "links[1]"
  //   const arrayMatch = key.match(/(^[^\[]+)\[([0-9]+)\]$/);
  //   if (arrayMatch) {
  //     const arrayKey = arrayMatch[1];
  //     const index = parseInt(arrayMatch[2], 10);

  //     if (keys.length === 1) {
  //       const newArray = [...(obj[arrayKey] || [])];
  //       newArray[index] = value;
  //       return { ...obj, [arrayKey]: newArray };
  //     } else {
  //       const newArray = [...(obj[arrayKey] || [])];
  //       newArray[index] = setValue(newArray[index] || {}, keys.slice(1), value);
  //       return { ...obj, [arrayKey]: newArray };
  //     }
  //   }

  //   // If we're at the last key, set the value
  //   if (keys.length === 1) {
  //     return { ...obj, [key]: value };
  //   }

  //   // Otherwise, continue navigating
  //   if (!obj[key]) {
  //     obj[key] = {};
  //   }

  //   return { ...obj, [key]: setValue(obj[key], keys.slice(1), value) };
  // }

  // const updatedData = setValue(state, keys, value);
  // State.update(updatedData)
  // // set(updatedData);
}
return (
  <div>
    <p>{JSON.stringify(state)}</p>
    <Creator
      typeDef={typeDef}
      displayInfo={displayInfo}
      data={state}
      errors={state.errors}
      onChange={onChange}
      debug={true}
    />
    <button onClick={handleSubmit}>submit</button>
  </div>
);
