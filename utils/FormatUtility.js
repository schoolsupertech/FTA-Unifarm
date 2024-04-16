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

  function nextDateFormat() {
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    const nextDay = nextDate.getDate();
    const currentMonth = nextDate.getMonth() + 1;
    const currentYear = nextDate.getFullYear();

    return `Ngày ${nextDay < 10 ? "0" + nextDay : nextDay} tháng ${currentMonth < 10 ? "0" + currentMonth : currentMonth} năm ${currentYear}`;
  }

  return {
    currencyFormat,
    dateFormat,
    nextDateFormat,
  };
};

export default createFormatUtil;
