import { ProductItemProps } from '@types';
import styles from './OrderItemThumbnail.module.scss';

interface OrderItemThumbnailProps
  extends Pick<ProductItemProps, 'name' | 'price'> {
  imageSrc: string;
  quantity: number;
}

export default function OrderItemThumbnail({
  imageSrc,
  name,
  quantity,
  price,
}: OrderItemThumbnailProps) {
  const total = (quantity * price).toFixed(2);

  return (
    <article className={styles.orderItemThumbnail}>
      <img
        src={imageSrc}
        alt={`Image of ${name}`}
        width={48}
        height={48}
        className={styles.orderItemThumbnail__image}
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
            aria-label={`Price per unit: $${price.toFixed(2)}`}
          >
            {`@ $${price.toFixed(2)}`}
          </span>
        </p>
      </section>

      <p
        className={styles.orderItemThumbnail__total}
        aria-label={`Total: $${total}`}
      >
        {`$${total}`}
      </p>
    </article>
  );
}
