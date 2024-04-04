const createFormatUtil = () => {
  function currencyFormat(amount) {
    return parseFloat(amount).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  function dateFormat(datePicked) {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const day = datePicked.getDate();
    const month = datePicked.getMonth() + 1;
    const year = datePicked.getFullYear();

    if (day === currentDay && month === currentMonth && year === currentYear) {
      return `Ngày ${day < 10 ? "0" + day : day} tháng ${month < 10 ? "0" + month : month} năm ${year} (Hôm nay)`;
    } else {
      return `Ngày ${day < 10 ? "0" + day : day} tháng ${month < 10 ? "0" + month : month} năm ${year}`;
    }
  }

  return {
    currencyFormat,
    dateFormat,
  };
};

export default createFormatUtil;
