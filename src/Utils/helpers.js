export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

//format date
export function formatDate(inputDateTime) {
  if (!inputDateTime) return "";
  // Tạo một đối tượng Date từ chuỗi đầu vào
  const date = new Date(inputDateTime);
  // Lấy ngày, tháng, năm, giờ và phút từ đối tượng Date
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lưu ý rằng tháng bắt đầu từ 0
  const year = date.getFullYear();
  // Tạo chuỗi định dạng "dd/mm/yyyy giờ:phút"
  // const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
  const formattedDateTime = `${day}/${month}/${year}`;
  return formattedDateTime;
}

//format datetime
export function formatDateTime(inputDateTime) {
  if (!inputDateTime) return "";
  // Tạo một đối tượng Date từ chuỗi đầu vào
  const date = new Date(inputDateTime);
  // Lấy ngày, tháng, năm, giờ và phút từ đối tượng Date
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lưu ý rằng tháng bắt đầu từ 0
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  // Tạo chuỗi định dạng "dd/mm/yyyy giờ:phút"
  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
  return formattedDateTime;
}

export function renderTypeProcess(type) {
  switch (type) {
    case "pesticide":
      return "Phòng trừ sâu bệnh";
    case "fertilize":
      return "Bón phân";
    case "planting":
      return "Gieo trồng";
    case "other":
      return "Hoạt động khác";
    case "cultivation":
      return "Làm đất";
  }
}

export function renderTypeFertilization(type) {
  switch (type) {
    case "baseFertilizer":
      return "Bón lót";
    case "topFertilizer":
      return "Bón thúc";
    case "pest":
      return "Sâu";
    case "disease":
      return "Bệnh";
  }
}

export function renderTypePestAndDisease(type) {
  switch (type) {
    case "pest":
      return "Sâu";
    case "disease":
      return "Bệnh";
  }
}

export function renderTypePlant(type) {
  switch (type) {
    case "herb":
      return "Rau gia vị";
    case "leafy":
      return "Rau ăn lá";
    case "root":
      return "Củ";
    case "fruit":
      return "Quả";
  }
}
export function renderTypeProcessProject(type) {
  switch (type) {
    case "inProgress":
      return "Đang thực hiện";
    case "finished":
      return "Hoàn thành";
    default:
      return "Đã hủy";
  }
}

export function formatTransactionHashTable({ str, a, b }) {
  if (!str) return "Transaction not found";
  if (
    a < 0 ||
    b < 0 ||
    a >= str.length ||
    b >= str.length ||
    a + b > str.length
  ) {
    return "Invalid input";
  }
  const prefix = str.slice(0, a);
  const suffix = str.slice(-b);
  const formatedFormatTransactionHash = prefix + "..." + suffix;
  return (
    <a
      href={`/search/transaction-hash/${str}`}
      target="_blank"
      rel="noreferrer"
    >
      {formatedFormatTransactionHash}
    </a>
  );
}

export function formatLongText({ str, a, b }) {
  if(!str) return "";
  if (
    a < 0 ||
    b < 0 ||
    a >= str.length ||
    b >= str.length ||
    a + b > str.length
  ) {
    return "Invalid input";
  }
  const prefix = str.slice(0, a);
  const suffix = str.slice(-b);
  const formatedFormatTransactionHash = prefix + "..." + suffix;
  return <span>{formatedFormatTransactionHash}</span>;
}

export function formatWalletAddress({ str, a, b }) {
  if (
    a < 0 ||
    b < 0 ||
    a >= str.length ||
    b >= str.length ||
    a + b > str.length
  ) {
    return "Invalid input";
  }
  const prefix = str.slice(0, a);
  const suffix = str.slice(-b);
  const formatedFormatTransactionHash = prefix + "..." + suffix;
  return (
    <a
      href={`https://escan.live/address/${str}`}
      target="_blank"
      rel="noreferrer"
    >
      {formatedFormatTransactionHash}
    </a>
  );
}
