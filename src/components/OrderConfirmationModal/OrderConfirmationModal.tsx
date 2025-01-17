import iconOrderConfirmed from '@assets/images/icon-order-confirmed.svg';
import Button from '@components/Button/Button';
import OrderItemThumbnail from '@components/OrderItemThumbnail/OrderItemThumbnail';
import OrderSummaryDetails from '@components/OrderSummaryDetails/OrderSummaryDetails';
import { useOrderStore } from '@store/orderStore';
import { OrderProductProps } from '@types';
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

  const renderItem = ({ name, image, price, quantity }: OrderProductProps) => (
    <OrderItemThumbnail
      imageSrc={image.thumbnail}
      name={name}
      price={price}
      quantity={quantity}
    />
  );

  const handleCloseModal = () => {
    clearOrder();
    onCloseModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        role="button"
        aria-label="Close the order confirmation modal"
      />

      <div
        className={styles.modal__container}
        role="dialog"
        aria-labelledby="order-confirmation-title"
      >
        <div className={styles.modal__content}>
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
              <OrderSummaryDetails
                items={order}
                renderItem={renderItem}
                totalAmount={totalAmount}
              />
            </div>
          )}

          <Button
            variant="default"
            onClick={handleCloseModal}
            label="Start New Order"
          />
        </div>
      </div>
    </div>
  );
}
