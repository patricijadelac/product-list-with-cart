import AddToCart from '@components/AddToCart/AddToCart';
import { useOrderStore } from '@store/orderStore';
import { ProductItemProps } from '@types';
import clsx from 'clsx';
import styles from './ProductItem.module.scss';

export default function ProductItem({
  product: { name, category, price, image },
}: {
  product: ProductItemProps;
}) {
  const { order, increaseProductQuantity, decreaseProductQuantity } =
    useOrderStore();

  const productInOrder = order.find((item) => item.name === name);
  const quantityInOrder = productInOrder?.quantity || 0;

  return (
    <div className={styles.productItem}>
      <div className={styles.productItem__imageContainer}>
        <picture>
          <source media="(min-width: 1440px)" srcSet={image.desktop} />
          <source media="(min-width: 768px)" srcSet={image.tablet} />
          <img
            src={image.mobile}
            alt={name}
            className={clsx(
              styles.productItem__image,
              quantityInOrder > 0 && styles.productItem__imageWithBorder
            )}
          />
        </picture>

        <div className={styles.productItem__addToCart}>
          <AddToCart
            onAdd={() =>
              increaseProductQuantity({
                name,
                category,
                price,
                image,
                quantity: quantityInOrder,
              })
            }
            onRemove={() => decreaseProductQuantity(name)}
            quantity={quantityInOrder}
          />
        </div>
      </div>

      <div className={styles.productItem__details}>
        <span className={styles.productItem__category}>{category}</span>
        {name}
        <span className={styles.productItem__price}>${price.toFixed(2)}</span>
      </div>
    </div>
  );
}
