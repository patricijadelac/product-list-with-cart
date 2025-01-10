import iconTree from '@assets/images/icon-carbon-neutral.svg';
import iconEmptyCart from '@assets/images/illustration-empty-cart.svg';
import Button from '@components/Button/Button';
import CartItemThumbnail from '@components/CartItemThumbnail/CartItemThumbnail';
import { useOrderStore } from '@store/orderStore';
import { useMemo } from 'react';
import styles from './ShoppingCart.module.scss';

interface ShoppingCartProps {
  onOpenModal: () => void;
}

export default function ShoppingCart({ onOpenModal }: ShoppingCartProps) {
  const { order } = useOrderStore();
  const isCartEmpty = order.length === 0;

  const calculateTotalAmount = useMemo(
    () => order.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [order]
  );

  const calculateTotalItems = useMemo(
    () => order.reduce((sum, item) => sum + item.quantity, 0),
    [order]
  );

  return (
    <section className={styles.shoppingCart}>
      <h2 className={styles.shoppingCart__heading}>
        {`Your Cart (${calculateTotalItems})`}
      </h2>

      {isCartEmpty ? (
        <div className={styles.shoppingCartEmpty}>
          <img
            src={iconEmptyCart}
            alt="Empty cart illustration"
            width={128}
            height={128}
            aria-hidden="true"
          />
          <p className={styles.shoppingCartEmpty__message}>
            Your added items will appear here
          </p>
        </div>
      ) : (
        <>
          <ul className={styles.shoppingCart__list}>
            {order.map((item) => (
              <li className={styles.shoppingCart__item} key={item.name}>
                <CartItemThumbnail {...item} />
              </li>
            ))}
          </ul>

          <hr className={styles.shoppingCart__divider} />

          <div className={styles.shoppingCart__total}>
            <p className={styles.shoppingCart__totalLabel}>Order Total</p>
            <p
              className={styles.shoppingCart__totalAmount}
              aria-label={`Order total is $${calculateTotalAmount.toFixed(2)}`}
            >
              ${calculateTotalAmount.toFixed(2)}
            </p>
          </div>

          <div className={styles.shoppingCart__environmentalMessage}>
            <img
              src={iconTree}
              alt="Carbon-neutral delivery"
              width={20}
              height={20}
              aria-hidden="true"
            />
            <p>
              This is a <strong>carbon-neutral</strong> delivery
            </p>
          </div>

          <Button
            variant="default"
            onClick={onOpenModal}
            label="Confirm Order"
          />
        </>
      )}
    </section>
  );
}
