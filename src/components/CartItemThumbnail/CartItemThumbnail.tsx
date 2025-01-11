import Button from '@components/Button/Button';
import { useOrderStore } from '@store/orderStore';
import { ProductItemProps } from '@types';
import styles from './CartItemThumbnail.module.scss';

interface CartItemThumbnailProps
  extends Pick<ProductItemProps, 'name' | 'price'> {
  quantity: number;
}

export default function CartItemThumbnail({
  name,
  quantity,
  price,
}: CartItemThumbnailProps) {
  const { removeProductFromOrder } = useOrderStore();
  const total = quantity * price;

  return (
    <article className={styles.cartItemThumbnail}>
      <section className={styles.cartItemThumbnail__details}>
        <h3 className={styles.cartItemThumbnail__name}>{name}</h3>

        <p className={styles.cartItemThumbnail__priceInfo}>
          <span
            className={styles.cartItemThumbnail__quantity}
            aria-label={`Quantity: ${quantity}`}
          >
            {`${quantity}x`}
          </span>
          <span
            className={styles.cartItemThumbnail__price}
            aria-label={`Price per unit: $${price.toFixed(2)}`}
          >
            {`@ $${price.toFixed(2)}`}
          </span>
          <span
            className={styles.cartItemThumbnail__total}
            aria-label={`Total: $${total.toFixed(2)}`}
          >
            {`$${total.toFixed(2)}`}
          </span>
        </p>
      </section>

      <Button
        variant="removeItem"
        onClick={() => removeProductFromOrder(name)}
      />
    </article>
  );
}
