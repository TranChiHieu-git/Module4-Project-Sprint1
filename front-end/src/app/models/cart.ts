import {Product} from './product';
import {Customer} from './customer';

export class Cart {
  id: CartId;
  quantity: number;

}
export class CartId {
  product: Product;
  user: Customer;
}
