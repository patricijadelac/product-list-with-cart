import OrderConfirmationModal from '@components/OrderConfirmationModal/OrderConfirmationModal';
import ProductList from '@components/ProductList/ProductList';
import ShoppingCart from '@components/ShoppingCart/ShoppingCart';
import { ProductItemProps } from '@types';
import { useEffect, useState } from 'react';
import styles from './Home.module.scss';

export default function Home() {
  const [products, setProducts] = useState<ProductItemProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchProducts = () => {
    fetch('./data.json')
      .then((resp) => resp.json())
      .then((data) => setProducts(data))
      .catch((e: Error) => {
        console.error('Error fetching products:', e.message);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.container__left}>
        <h1>Desserts</h1>
        <ProductList products={products} />
      </div>

      <ShoppingCart onOpenModal={handleOpenModal} />

      <OrderConfirmationModal
        isOpen={isModalOpen}
        onCloseModal={handleCloseModal}
      />
    </main>
  );
}
