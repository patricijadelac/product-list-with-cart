import styles from './OrderSummaryDetails.module.scss';

interface OrderSummaryDetailsProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  totalAmount: number;
}

export default function OrderSummaryDetails<T>({
  items,
  renderItem,
  totalAmount,
}: OrderSummaryDetailsProps<T>) {
  if (items.length === 0) {
    return <p>No items available</p>;
  }

  return (
    <div className={styles.orderSummaryDetails}>
      <ul className={styles.orderSummaryDetails__list}>
        {items.map((item, index) => (
          <li className={styles.orderSummaryDetails__item} key={index}>
            {renderItem(item)}
          </li>
        ))}
      </ul>

      <hr className={styles.orderSummaryDetails__divider} />

      <div className={styles.orderSummaryDetails__total}>
        <p className={styles.orderSummaryDetails__totalLabel}>Order Total</p>
        <p
          className={styles.orderSummaryDetails__totalAmount}
          aria-label={`Order total is $${totalAmount.toFixed(2)}`}
        >
          ${totalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
