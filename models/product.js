class Product {
  constructor(
    id,
    categoryIds,
    title,
    sold,
    openDate,
    source,
    description,
    moreInfo,
    price,
    listedPrice,
    unit,
    numberInStock,
    typeOfProduct,
    gallery,
    isExpired,
  ) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.title = title;
    this.sold = sold;
    this.openDate = openDate;
    this.source = source;
    this.description = description;
    this.moreInfo = moreInfo;
    this.price = price;
    this.listedPrice = listedPrice;
    this.unit = unit;
    this.numberInStock = numberInStock;
    this.typeOfProduct = typeOfProduct;
    this.gallery = gallery;
    this.isExpired = isExpired;
  }
}

export default Product;
