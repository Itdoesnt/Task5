import classNames from 'classnames';
import styles from './index.module.scss';
import { Price } from '../Price/Price';
import { AddButton } from '../AddButton/AddButton';
import { AddToFavorite } from '../AddToFavorite/AddToFavorite';
import { ProductImage } from '../ProductImage/ProductImage';

export const CatalogItem = ({ className, product }) => {
  return (
    <div className={classNames(styles.root, className)}>
      <ProductImage className={styles.pic} product={product} />
      <div className={styles.content}>
        <Price product={product} />
        <div className={styles.name} title={product.name}>
          {product.name}
        </div>
        <div className={styles.stock}>{product.stock} шт</div>
        <div className={styles.buttons}>
          <AddButton className={styles.addToCart} product={product} />
          <AddToFavorite product={product} />
        </div>
      </div>
    </div>
  );
};
