import Category from "../models/category";
import Product from "../models/product";

export const CATEGORIES = [
  new Category(
    "c1",
    "Sản phẩm nổi bật",
    "https://images.unsplash.com/photo-1683134668151-e788d761f5e3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ),
  new Category(
    "c2",
    "Thịt, Hải sản, Trứng",
    "https://media.istockphoto.com/id/603267744/vi/anh/m%C3%B3n-tapas.jpg?s=2048x2048&w=is&k=20&c=dSREIEK7XSu6fd3vbEecWGpPuBtuM9x1wHw6b9cx3MI=",
  ),
  new Category(
    "c3",
    "Trái cây tươi",
    "https://images.unsplash.com/photo-1506395308321-904a71783d60?q=80&w=1883&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ),
  new Category(
    "c4",
    "Rau củ sạch",
    "https://media.istockphoto.com/id/1457113212/vi/anh/rau-h%E1%BB%AFu-c%C6%A1-xanh-v%C3%A0-n%E1%BB%81n-th%E1%BB%B1c-ph%E1%BA%A9m-l%C3%A1-s%E1%BA%ABm-m%C3%A0u-nh%C6%B0-m%E1%BB%99t-kh%C3%A1i-ni%E1%BB%87m-%C4%83n-u%E1%BB%91ng-l%C3%A0nh-m%E1%BA%A1nh.jpg?s=1024x1024&w=is&k=20&c=--eEOkZpG3Kx0SmYtH35v3fOAvYeZ2jNDnKPvvS3WEU=",
  ),
  new Category(
    "c5",
    "Thực phẩm đông - mát",
    "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ),
];

export const PRODUCTS = [
  new Product(
    "p1",
    ["c1", "c2", "c5"],
    "Thịt heo",
    58,
    "03/02/2024",
    "Anh em nhà Heo Bắc Ninh, Việt Nam",
    'Thịt Heo do anh em nhà Heo Bắc Ninh tự đẻ, tự nuôi, tự thịt đem đi bán cho mọi người ăn. Thịt Heo đảm bảo 100% sạch sẽ đã được kiểm chứng bởi "Công Ty Kiểm Chứng Thực Phẩm Sạch Sẽ Của Kho Nông Trại Toàn Quốc" số 1 tại Việt Nam. Thịt ngon đảm bảo chất lượng, kêu gọi mọi người mua ngay kẻo mai nó thúi!',
    [
      "Độ tươi: 99%",
      "Bộ: Nạt, Sườn, Vú Heo,...",
      "Loại thực phẩm: Thông qua nấu nướng, chế biến trước khi ăn",
      "Chế độ nấu: Nướng, Chiên, Luộc, Tái,...",
      "Bảo quản: Bảo quản trong tủ lạnh để có độ tươi ngon nhất!",
    ],
    "49.000",
    "109.000",
    ["Kg", "Gram"],
    99,
    "Thịt",
    [
      "https://media.istockphoto.com/id/502966066/vi/anh/s%C6%B0%E1%BB%9Dn-c%E1%BB%ABu-t%C6%B0%C6%A1i-v%E1%BB%9Bi-gia-v%E1%BB%8B.jpg?s=2048x2048&w=is&k=20&c=CKoauRZRj7VA098Mzxy8qP0r_X_mRIZ8k-T3xy-2j10=",
      "https://media.istockphoto.com/id/847276540/vi/anh/c%E1%BB%95-c%E1%BB%ABu.jpg?s=2048x2048&w=is&k=20&c=2E6zS0Nx01AJMku4VxnjNoaferd5VB7nebnAZndYizo=",
      "https://images.unsplash.com/photo-1448907503123-67254d59ca4f?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1508615263227-c5d58c1e5821?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    false,
  ),
  new Product(
    "p2",
    ["c1", "c3"],
    "Cam Sấy Đà Lạt Ngon ẤtƠơ, ăn vô bơ luôn team dev =))))))",
    41,
    "30/01/2024",
    "Nông trại Khánh Dương, Tp. Đà Lạt, Việt Nam",
    'Trái cây được nuôi trồng từ những người nông dân yêu nước thực thụ, sản phẩm đã được khiểm chứng bởi "Hội thánh Trái Cây Uy Tín" nhất tại Việt Nam',
    [
      "Độ tươi: 98%",
      "Loại thực phẩm: đã chín, có thể ăn ngay",
      "Bảo quản: Bảo quản trong tủ lạnh",
    ],
    "36.200",
    "59.400",
    ["Kg", "Gram", "Quả"],
    99,
    "Trái cây",
    [
      "https://media.istockphoto.com/id/1455758897/vi/anh/chanh-qu%C3%BDt-cam-cho-n%C4%83m-m%E1%BB%9Bi-c%E1%BB%A7a-trung-qu%E1%BB%91c.jpg?s=1024x1024&w=is&k=20&c=c-eLqYe80tUCos9x4gwb0oyNZmzjIYCF4TWiJ2Nsesk=",
      "https://images.unsplash.com/photo-1543076659-9380cdf10613?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1631148601579-9e20bf28ab59?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1563822249510-04678c78df85?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    false,
  ),
  new Product(
    "p3",
    ["c1", "c3"],
    "Chuối xanh",
    41,
    "30/03/2024",
    "Trại trồng cây, Việt Nam",
    'Trái cây được nuôi trồng từ những người nông dân yêu nước thực thụ, sản phẩm đã được khiểm chứng bởi "Hội thánh Trái Cây Uy Tín" nhất tại Việt Nam',
    [
      "Độ tươi: 98%",
      "Loại thực phẩm: còn sống, không thể ăn liền",
      "Một chùm: Có 6 nải chuối",
      "Bảo quản: Bảo quản nơi khô ráo, thoáng, mát",
      "Hướng dẫn sử dụng: Để có thể ăn được, quý khách cần để 2 - 3 ngày cho trái vàng ra mới ăn được nha.",
    ],
    "42.900",
    "63.850",
    ["Kg", "Gram", "Chùm"],
    99,
    "Trái cây",
    [
      "https://images.unsplash.com/photo-1583525957858-1463306158b1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1663954864079-7452e284aeae?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1573828235229-fb27fdc8da91?q=80&w=1798&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1617631716600-6a454b430367?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1619995750009-5256e91437b0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    false,
  ),
  new Product(
    "p4",
    ["c1", "c4", "c5"],
    "Rau dền",
    76,
    "12/02/2024",
    "Vườn nông sản Lào Cai, Việt Nam",
    "Rau dền là một loại rau chân vịt, sở dĩ loại rau này có tên đó bởi vì nó có hình dáng giống chân của con vịt. Loại rau được trồng bởi những người nông dân yêu nước tại Việt Nam, khách hàng sẽ không phải lo lắng về việc loại thực phẩm thiết nguồn gốc.",
    [
      "Độ tươi: 100%",
      "Loại thực phẩm: rau sống",
      "Bảo quản: Bảo quan tốt nhất ở ngăn mát trong tủ lạnh",
    ],
    "12.000",
    "19.000",
    ["Kg", "Gram", "Bó"],
    99,
    "Rau",
    [
      "https://images.unsplash.com/photo-1511993226957-cd166aba52d8?q=80&w=1898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1634731201932-9bd92839bea2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1547058606-7eb25508e7e0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1593528852413-69f279565422?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    false,
  ),
];