import ProductItem from '@components/ProductItem/ProductItem';
import { ProductItemProps } from '@types';
import styles from './ProductList.module.scss';

export default function ProductList({
  products,
}: {
  products: ProductItemProps[];
}) {
  const noProductsMessage =
    'Our product selection is coming soon. Stay tuned for updates!';

  return products.length === 0 ? (
    <p>{noProductsMessage}</p>
  ) : (
    <ul className={styles.productList}>
      {products.map((product) => (
        <li key={product.name}>
          <ProductItem product={product} />
        </li>
      ))}
    </ul>
  );
}
