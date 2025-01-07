import iconAddToCart from '@assets/images/icon-add-to-cart.svg';
import Button from '@components/Button/Button';
import clsx from 'clsx';
import styles from './AddToCart.module.scss';

interface AddToCartProps {
  onAdd: () => void;
  onRemove: () => void;
  quantity: number;
}

export default function AddToCart({
  onAdd,
  onRemove,
  quantity,
}: AddToCartProps) {
  return (
    <>
      {quantity > 0 ? (
        <div className={clsx(styles.addToCart, styles.addToCart__container)}>
          <Button variant="decrementQuantity" onClick={onRemove} />
          <p
            aria-label="Current quantity of this product"
            className={styles.addToCart__quantity}
          >
            {quantity}
          </p>
          <Button variant="incrementQuantity" onClick={onAdd} />
        </div>
      ) : (
        <button
          className={clsx(styles.addToCart, styles.addToCart__button)}
          onClick={onAdd}
        >
          <img
            src={iconAddToCart}
            alt="Shopping cart"
            width={20}
            height={20}
            aria-hidden="true"
          />
          Add to Cart
        </button>
      )}
    </>
  );
}
