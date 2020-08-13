import {Brand} from './brand';

export class Product {
  productId: number;
  productName: string;
  category: string;
  expiryDate: string;
  quantity: number;
  unit: string;
  brand: Brand;
  price: number;
  infor: string;
  imageUrl: string;
    constructor(productId: number, productName: string, category: string, expiryDate: string, quantity: number,
                unit: string, brand: Brand, price: number, infor: string) {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
        this.expiryDate = expiryDate;
        this.quantity = quantity;
        this.unit = unit;
        this.brand = brand;
        this.price = price;
        this.infor = infor;
    }
}
