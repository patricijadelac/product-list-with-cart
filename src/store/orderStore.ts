import { ProductItemProps } from '@types';
import { create } from 'zustand';

interface OrderProductProps extends ProductItemProps {
  quantity: number;
}

interface OrderState {
  order: OrderProductProps[];
  increaseProductQuantity: (product: OrderProductProps) => void;
  decreaseProductQuantity: (productName: string) => void;
  removeProductFromOrder: (productName: string) => void;
  clearOrder: () => void;
}

const updateProductQuantity = (
  state: OrderState,
  productName: string,
  operation: 'increase' | 'decrease'
) => {
  return state.order.map((item) =>
    item.name === productName
      ? {
          ...item,
          quantity:
            operation === 'increase' ? item.quantity + 1 : item.quantity - 1,
        }
      : item
  );
};

export const useOrderStore = create<OrderState>((set) => ({
  order: [],

  increaseProductQuantity: (product) =>
    set((state) => {
      const existingProduct = state.order.find(
        (item) => item.name === product.name
      );

      if (existingProduct) {
        return {
          order: updateProductQuantity(state, product.name, 'increase'),
        };
      }

      return { order: [...state.order, { ...product, quantity: 1 }] };
    }),

  decreaseProductQuantity: (productName) =>
    set((state) => {
      const product = state.order.find((item) => item.name === productName);

      if (product && product.quantity > 1) {
        return { order: updateProductQuantity(state, productName, 'decrease') };
      }

      return {
        order: state.order.filter((item) => item.name !== productName),
      };
    }),

  removeProductFromOrder: (productName) =>
    set((state) => ({
      order: state.order.filter((item) => item.name !== productName),
    })),

  clearOrder: () => set({ order: [] }),
}));
