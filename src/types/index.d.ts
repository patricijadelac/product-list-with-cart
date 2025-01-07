interface ProductImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface ProductItemProps {
  image: ProductImage;
  name: string;
  category: string;
  price: number;
}

export interface OrderedItemProps {
  name: ProductItemProps.name;
  price: ProductItemProps.price;
  quantity: number;
}
