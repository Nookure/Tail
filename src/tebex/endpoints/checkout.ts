import Basket from '@/interfaces/basket';
import ApiEndpoint from './model';
import Item from '@/interfaces/item';
import BasketResponse from '@/interfaces/basketResponse';

class Checkout extends ApiEndpoint {
  /**
   * Creates a new checkout session.
   * @param basket the basket
   * @param items the items
   * @returns A promise containing the basket response.
   */
  public create(basket: Basket, items: Item[]) : Promise<BasketResponse> {
    return new Promise((resolve, reject) => {
      this.http.post('checkout', {
        basket,
        items,
      }).then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err.response.data);
      });
    });
  }
}

export default Checkout;
