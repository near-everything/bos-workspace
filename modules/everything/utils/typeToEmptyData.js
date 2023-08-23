const isPrimitiveType = (type) =>
  ["string", "number", "boolean", "date", "md"].includes(type);

const isComplexType = (type) =>
  Array.isArray(type)
    ? "typesArray" // I don't know if we still need to handle this
    : type === "array"
    ? "array"
    : typeof type === "object"
    ? "object"
    : typeof type === "string" && !isPrimitiveType(type)
    ? "custom"
    : null;

const getDefaultForPrimitive = (type, defaultValue) => {
  if (defaultValue !== undefined) {
    return defaultValue;
  }
  switch (type) {
    case "string":
      return "";
    case "number":
      return null; // should this be 0?
    case "boolean":
      return null; // do we want this to be false?
    case "date":
      return null; // do we want this to be today?
    case "md":
      return null;
  }
};

const typeToEmptyData = (typeDef) => {
  const obj = {};

  Object.keys(typeDef.properties).forEach((key) => {
    const fieldSchema = typeDef.properties[key];
    const type = fieldSchema.type;

    if (isPrimitiveType(type)) {
      obj[key] = getDefaultForPrimitive(type, fieldSchema.defaultValue);
    } else if (isComplexType(type) === "array") {
      obj[key] = fieldSchema.defaultValue ? [...fieldSchema.defaultValue] : [];
    } else if (isComplexType(type) === "object") {
      obj[key] = typeToEmptyData({ properties: type.properties });
    } else {
      console.log("edge case not handled for type: " + type);
      obj[key] = fieldSchema.defaultValue ?? null;
    }
  });

  return obj;
};

const PRIMITIVE_VALIDATIONS = {
  string: (value, { min, max, pattern }) => {
    if (typeof value !== "string")
      return `Expected a string, got ${typeof value}.`;

    if (min && value.length < min)
      return `Must be at least ${min} characters long.`;

    if (max && value.length > max)
      return `Must be at most ${max} characters long.`;

    if (pattern && !value.match(pattern))
      return `The value "${value}" does not match expected pattern: ${pattern}`;
  },
  number: (value, { min, max }) => {
    if (typeof value !== "number")
      return `Expected a number, got ${typeof value}.`;

    if (min && value < min) return `Must be at least ${min}.`;

    if (max && value > max) return `Must be at most ${max}.`;
  },
  boolean: (value) => {
    if (typeof value !== "boolean")
      return `Expected a boolean, got ${typeof value}.`;
  },
};

function validatePrimitiveType(type, value, constraints) {
  if (!isPrimitiveType(type))
    throw {
      message: `Unknown primitive type: ${type}`,
      type,
      value,
    };

  return PRIMITIVE_VALIDATIONS[type](value, constraints);
}

function validateType(type, value, parent) {
  if (value === undefined || value === "" || value === null) {
    if (parent.validation?.required) {
      return `This field is required but missing.`;
    }
    return;
  }

  if (isPrimitiveType(type))
    return validatePrimitiveType(type, value, parent.validation);

  if (isComplexType(type) === "typesArray") {
    const errors = [];
    for (const subType of type) {
      const error = validateType(subType, value, parent[subType]);
      if (!error) return; // Stop if a valid type is found
      errors.push(error);
    }
    if (errors.length === type.length) {
      // only return the deepest error
      for (const error of errors) {
        if (typeof error === "object") return error;
      }
      return errors[errors.length - 1];
    }
  }

  if (isComplexType(type) === "array") {
    if (!Array.isArray(value)) {
      return `Expected an array, got ${typeof value}.`;
    }

    if (
      parent["array"].validation.min &&
      value.length < parent["array"].validation.min
    ) {
      return `Must have at least ${parent["array"].validation.min} items.`;
    }

    if (
      parent["array"].validation.max &&
      value.length > parent["array"].validation.max
    ) {
      return `Must have at most ${parent["array"].validation.max} items.`;
    }

    for (const item of value) {
      const error = validateType(parent["array"].type, item, parent["array"]);
      if (error)
        return {
          [value.indexOf(item)]: error,
        };
    }
  }

  if (isComplexType(type) === "object") {
    if (typeof value !== "object" || Array.isArray(value)) {
      return `Expected an object, got ${typeof value}.`;
    }

    // Validate properties of the object
    for (const property of type.properties) {
      const propName = property.name;
      const propType = property.type;
      const propValue = value[propName];

      if (property.required && propValue === undefined) {
        return `Property ${propName} is required but missing.`;
      }

      if (propValue !== undefined) {
        const error = validateType(propType, propValue, property);
        if (error)
          return {
            [propName]: error,
          };
      }
    }
  }

  if (isComplexType(type) === "custom") {
    return validateType(types[type], value);
  }
}

