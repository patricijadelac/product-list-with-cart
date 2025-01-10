import ProductItem from '@components/ProductItem/ProductItem';
import { ProductItemProps } from '@types';
import styles from './ProductList.module.scss';

const NO_PRODUCTS_MESSAGE =
  'Our product selection is coming soon. Stay tuned for updates!';

interface ProductListProps {
  products: ProductItemProps[];
}

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <p>{NO_PRODUCTS_MESSAGE}</p>;
  }

  return (
    <ul className={styles.productList}>
      {products.map((product) => (
        <li key={product.name}>
          <ProductItem product={product} />
        </li>
      ))}
    </ul>
  );
}
