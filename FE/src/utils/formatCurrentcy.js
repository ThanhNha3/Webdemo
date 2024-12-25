function formatCurrentcy(
  amount,
  separator = null,
  locale = "vi-VN",
  currency = false,
  currencyType = "VND"
) {
  if (separator) {
    // Custom separator
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  }

  // Default locale or currency formatting
  const options = currency ? { style: "currency", currency: currencyType } : {};
  return amount.toLocaleString(locale, options);
}

export { formatCurrentcy };
