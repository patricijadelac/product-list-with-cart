import IconDecrementQuantity from '@assets/images/icon-decrement-quantity.svg?react';
import IconIncrementQuantity from '@assets/images/icon-increment-quantity.svg?react';
import IconRemoveItem from '@assets/images/icon-remove-item.svg?react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonVariant =
  | 'incrementQuantity'
  | 'decrementQuantity'
  | 'removeItem'
  | 'default';

interface ButtonProps {
  variant: ButtonVariant;
  onClick: () => void;
  label?: string;
}

const buttonIcons: Record<Exclude<ButtonVariant, 'default'>, JSX.Element> = {
  incrementQuantity: (
    <IconIncrementQuantity className={styles.button__icon} aria-hidden="true" />
  ),
  decrementQuantity: (
    <IconDecrementQuantity className={styles.button__icon} aria-hidden="true" />
  ),
  removeItem: (
    <IconRemoveItem className={styles.button__icon} aria-hidden="true" />
  ),
};

const buttonAltText: Record<Exclude<ButtonVariant, 'default'>, string> = {
  incrementQuantity: 'Increment quantity for one item',
  decrementQuantity: 'Decrement quantity for one item',
  removeItem: 'Remove item from cart',
};

export default function Button({ variant, onClick, label }: ButtonProps) {
  const isDefault = variant === 'default';
  const buttonLabel = isDefault ? label : buttonAltText[variant];
  const buttonClasses = clsx(
    styles.button,
    styles[`button${variant[0].toUpperCase()}${variant.slice(1)}`]
  );

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      aria-label={isDefault ? undefined : buttonLabel}
    >
      {variant === 'default' ? label : buttonIcons[variant]}
    </button>
  );
}
