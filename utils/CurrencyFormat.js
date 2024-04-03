function currencyFormat(amount) {
  return parseFloat(amount).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

export default currencyFormat;
