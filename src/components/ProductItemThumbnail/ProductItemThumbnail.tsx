import Button from '@components/Button/Button';
import { useOrderStore } from '@store/orderStore';
import { ProductItemProps } from '@types';
import styles from './ProductItemThumbnail.module.scss';

interface OrderedItemProps extends Pick<ProductItemProps, 'name' | 'price'> {
  quantity: number;
}

export default function ProductItemThumbnail({
  name,
  quantity,
  price,
}: OrderedItemProps) {
  const { removeProductFromOrder } = useOrderStore();
  const total = quantity * price;

  return (
    <article className={styles.productItemThumbnail}>
      <section className={styles.productItemThumbnail__details}>
        <h3 className={styles.productItemThumbnail__name}>{name}</h3>

        <p className={styles.productItemThumbnail__priceInfo}>
          <span
            className={styles.productItemThumbnail__quantity}
            aria-label={`Quantity: ${quantity}`}
          >
            {`${quantity}x`}
          </span>
          <span
            className={styles.productItemThumbnail__price}
            aria-label={`Price per unit: $${price}`}
          >
            {`@ $${price.toFixed(2)}`}
          </span>
          <span
            className={styles.productItemThumbnail__total}
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
