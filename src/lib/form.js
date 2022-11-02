import { writable, get } from "svelte/store";
import { toast } from "@zerodevx/svelte-toast";

export const form = (schema, method = "insert") => {
  const values = writable({});
  const invalids = writable({});
  values.subscribe((values) => {
    invalids.set(
      Object.fromEntries(
        Object.entries(schema)
          .map(([key, field]) => {
            const value = values[key];
            if (!field) return null;
            if (field.validate) {
              const error = field.validate(value, method);
              if (error) {
                return [key, error];
              } else {
                return null;
              }
            }
            if (!value && value !== 0 && !field.optional) {
              return [key, `${field.name} is required.`];
            }
            if (field.regex && !value.match(field.regex)) {
              return [key, `${field.name} is invalid.`];
            }
            if (field.oneOf && !field.oneOf.includes(value)) {
              return [key, `${field.name} is invalid.`];
            }
            return null;
          })
          .filter(Boolean)
      )
    );
  });
  const check = () => {
    const err = Object.values(get(invalids)).pop();
    if (err) {
      toast.push(err);
      return false;
    }
    return true;
  };
  return { values, invalids, check };
};

form.types = {
  number(name, methods) {
    return {
      name,
      methods,
      validate(value) {
        const n = Number(value);
        if (!isFinite(n)) {
          return `${name} should be a number`;
        }
      },
    };
  },
  positiveNumber(name, methods) {
    return {
      name,
      methods,
      validate(value) {
        const n = Number(value);
        if (!isFinite(n)) {
          return `${name} should be a number`;
        }
        if (n <= 0) {
          return `${name} needs to be bigger than 0`;
        }
      },
    };
  },
};
