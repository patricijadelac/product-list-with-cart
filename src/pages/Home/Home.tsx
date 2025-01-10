import OrderConfirmationModal from '@components/OrderConfirmationModal/OrderConfirmationModal';
import ProductList from '@components/ProductList/ProductList';
import ShoppingCart from '@components/ShoppingCart/ShoppingCart';
import { ProductItemProps } from '@types';
import { useEffect, useState } from 'react';
import styles from './Home.module.scss';

export default function Home() {
  const [products, setProducts] = useState<ProductItemProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchJson = () => {
    fetch('./data.json')
      .then((resp) => resp.json())
      .then((data) => setProducts(data))
      .catch((e: Error) => console.error(e.message));
  };

  useEffect(() => {
    fetchJson();
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.container__left}>
        <h1>Desserts</h1>
        <ProductList products={products} />
      </div>

      <ShoppingCart onOpenModal={() => setIsModalOpen(true)} />

      <OrderConfirmationModal
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
      />
    </main>
  );
}
