interface Item {
  package: Package;
  type: string;
};

interface Package {
  name: string;
  price: number;
}

export default Item;