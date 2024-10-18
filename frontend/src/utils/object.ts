export const getField = <T extends object>(
  item: T | null | undefined,
  field: string
): "" => {
  if (!item || !field) {
    return "";
  }

  // Handle nested fields by splitting on dots
  const fields = field.split(".");

  // Recursively traverse the object following the field path
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = item;
  for (const key of fields) {
    if (value === null || value === undefined) {
      return "";
    }
    value = value[key];
  }

  return value || "";
};
