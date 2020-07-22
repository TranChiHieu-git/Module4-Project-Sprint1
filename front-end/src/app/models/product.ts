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
}
