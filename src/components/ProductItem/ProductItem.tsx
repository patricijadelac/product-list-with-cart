import AddToCart from '@components/AddToCart/AddToCart';
import { useOrderStore } from '@store/orderStore';
import { ProductItemProps } from '@types';
import clsx from 'clsx';
import styles from './ProductItem.module.scss';

export default function ProductItem({
  product,
}: {
  product: ProductItemProps;
}) {
  const { order, increaseProductQuantity, decreaseProductQuantity } =
    useOrderStore();

  const productInOrder = order.find((item) => item.name === product.name);
  const quantityInOrder = productInOrder ? productInOrder.quantity : 0;

  return (
    <div className={styles.productItem}>
      <div className={styles.productItem__imageContainer}>
        <picture>
          <source media="(min-width: 1440px)" srcSet={product.image.desktop} />
          <source media="(min-width: 768px)" srcSet={product.image.tablet} />
          <img
            src={product.image.mobile}
            alt={product.name}
            className={clsx(
              styles.productItem__image,
              quantityInOrder > 0 && styles.productItem__imageWithBorder
            )}
          />
        </picture>

        <div className={styles.productItem__addToCart}>
          <AddToCart
            onAdd={() =>
              increaseProductQuantity({ ...product, quantity: quantityInOrder })
            }
            onRemove={() => decreaseProductQuantity(product.name)}
            quantity={quantityInOrder}
          />
        </div>
      </div>

      <div className={styles.productItem__details}>
        <span className={styles.productItem__category}>{product.category}</span>
        {product.name}
        <span className={styles.productItem__price}>
          ${product.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
