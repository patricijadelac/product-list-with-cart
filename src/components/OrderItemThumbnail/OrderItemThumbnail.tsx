import { ProductItemProps } from '@types';
import styles from './OrderItemThumbnail.module.scss';

interface OrderedItemProps extends Pick<ProductItemProps, 'name' | 'price'> {
  imageSrc: string;
  quantity: number;
}

export default function OrderItemThumbnail({
  imageSrc,
  name,
  quantity,
  price,
}: OrderedItemProps) {
  const total = quantity * price;

  return (
    <article className={styles.orderItemThumbnail}>
      <img
        src={imageSrc}
        alt={name}
        width={48}
        height={48}
        className={styles.orderItemThumbnail__image}
        aria-hidden={true}
      />

      <section className={styles.orderItemThumbnail__details}>
        <h3 className={styles.orderItemThumbnail__name}>{name}</h3>

        <p className={styles.orderItemThumbnail__priceInfo}>
          <span
            className={styles.orderItemThumbnail__quantity}
            aria-label={`Quantity: ${quantity}`}
          >
            {`${quantity}x`}
          </span>
          <span
            className={styles.orderItemThumbnail__price}
            aria-label={`Price per unit: $${price}`}
          >
            {`@ $${price.toFixed(2)}`}
          </span>
        </p>
      </section>

      <p
        className={styles.orderItemThumbnail__total}
        aria-label={`Total: $${total.toFixed(2)}`}
      >
        {`$${total.toFixed(2)}`}
      </p>
    </article>
  );
}
