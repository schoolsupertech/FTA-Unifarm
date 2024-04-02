function currencyFormat(amount) {
  return parseFloat(amount).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VNĐ",
  });
}

export default currencyFormat;
