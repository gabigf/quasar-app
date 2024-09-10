export function useCurrencyFormatter(amount) {
  let plusMinusSymbol = "";

  if (amount > 0) plusMinusSymbol = "+";
  else if (amount < 0) plusMinusSymbol = "-";

  const positiveAmount = Math.abs(amount);
  const currencySymbol = "$";

  const formattedAmount = positiveAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${plusMinusSymbol} ${currencySymbol} ${formattedAmount}`;
}
