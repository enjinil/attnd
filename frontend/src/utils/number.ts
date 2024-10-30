export const displayDecimal = (value: string | number) => {
  const stringValue = String(value);
  const num = parseFloat(String(stringValue));

  // Handle invalid input
  if (isNaN(num)) {
    throw new Error("Invalid number input");
  }

  // Get decimal places
  const decimalPlaces = stringValue.split(".")[1]?.length || 0;

  // If no decimal places or ends with .00, return integer
  if (decimalPlaces === 0 || stringValue.endsWith(".00")) {
    return Math.floor(num);
  }

  // If has 2 decimal places and second decimal is 0 or 5
  if (decimalPlaces === 2) {
    const secondDecimal = parseInt(stringValue.split(".")[1][1]);
    if (secondDecimal === 0) {
      // Round to nearest 0.1
      return Math.round(num * 10) / 10;
    }
  }

  // Round to 1 decimal place
  return Math.round(num * 10) / 10;
};
