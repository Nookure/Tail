import axios, { AxiosInstance } from 'axios';
import Checkout from './endpoints/checkout';
import BasketApi from './endpoints/basket';

export interface TebexInstanceAuth {
  username: string;
  password: string;
}

class TebexInstance {
  private payments: Set<string> = new Set();

  private http: AxiosInstance;

  private checkout: Checkout;
  private basket: BasketApi;

  constructor({ username, password }: TebexInstanceAuth) {
    this.http = axios.create({
      baseURL: 'https://checkout.tebex.io/api/',
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username,
        password,
      },
    });

    this.checkout = new Checkout(this.http);
    this.basket = new BasketApi(this.http);
  }

  public addPayment(ident: string) {
    this.payments.add(ident);
  }

  public removePayment(ident: string) {
    this.payments.delete(ident);
  }

  public getPayments() {
    return Array.from(this.payments);
  }

  public getBasket() {
    return this.basket;
  }

  public getCheckout() {
    return this.checkout;
  }
}

export default TebexInstance;
