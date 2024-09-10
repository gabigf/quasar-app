export function useAmountColorClass(amount) {
  if (amount === 0) return;

  return amount < 0 ? "text-negative" : "text-positive";
}
