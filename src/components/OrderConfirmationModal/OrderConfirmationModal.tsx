import iconOrderConfirmed from '@assets/images/icon-order-confirmed.svg';
import Button from '@components/Button/Button';
import OrderItemThumbnail from '@components/OrderItemThumbnail/OrderItemThumbnail';
import { useOrderStore } from '@store/orderStore';
import clsx from 'clsx';
import { useEffect } from 'react';
import styles from './OrderConfirmationModal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

export default function OrderConfirmationModal({
  isOpen,
  onCloseModal,
}: ModalProps) {
  const { order, clearOrder } = useOrderStore();
  const totalAmount = order.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleCloseModal = () => {
    clearOrder();
    onCloseModal();
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return;
  }

  return (
    <div className={clsx(styles.modal, isOpen && styles.modalOpen)}>
      <div
        className={styles.modal__overlay}
        onClick={onCloseModal}
        aria-hidden="true"
      />

      <div
        className={styles.modal__container}
        role="dialog"
        aria-labelledby="order-confirmation-title"
      >
        <div className={styles.modal__header}>
          <img
            src={iconOrderConfirmed}
            alt="Order confirmed icon"
            width={48}
            height={48}
            className={styles.modal__icon}
            aria-hidden="true"
          />
          <h2 id="order-confirmation-title" className={styles.modal__title}>
            Order Confirmed
          </h2>
          <p className={styles.modal__label}>We hope you enjoy your food!</p>
        </div>

        {order.length > 0 && (
          <div className={styles.modal__listContainer}>
            <ul className={styles.modal__list}>
              {order.map(({ name, image, price, quantity }) => (
                <li className={styles.modal__item} key={name}>
                  <OrderItemThumbnail
                    imageSrc={image.thumbnail}
                    name={name}
                    price={price}
                    quantity={quantity}
                  />
                </li>
              ))}
            </ul>

            <hr className={styles.modal__divider} />

            <div className={styles.modal__total}>
              <p className={styles.modal__totalLabel}>Order Total</p>
              <p
                className={styles.modal__totalAmount}
                aria-label={`Order total is $${totalAmount.toFixed(2)}`}
              >
                ${totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        <Button
          variant="default"
          onClick={handleCloseModal}
          label="Start New Order"
        />
      </div>
    </div>
  );
}
