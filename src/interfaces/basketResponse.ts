interface BasketResponse {
  ident: string;
  expire: string;
  price: number;
  type: string;
  links: Links;
};

export interface Links {
  checkout?: string;
  payment?: string;
};

export default BasketResponse;
