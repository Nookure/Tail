import BasketResponse from '@/interfaces/basketResponse';
import ApiEndpoint from './model';

class BasketApi extends ApiEndpoint {
  public get(ident: string) : Promise<BasketResponse> {
    return new Promise((resolve, reject) => {
      this.http.get(`/baskets/${ident}`).then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err.response.data);
      });
    });
  }
}

export default BasketApi;
