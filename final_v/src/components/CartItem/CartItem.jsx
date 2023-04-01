import classNames from 'classnames';
import styles from './index.module.scss';
import { Price } from '../Price/Price';
import { ProductImage } from '../ProductImage/ProductImage';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions, cartSelectors } from '../../store/cart';

export const CartItem = ({ product, className }) => {
  const count = useSelector(cartSelectors.itemById(product._id));
  const dispatch = useDispatch();

  return (
    <div className={classNames(styles.root, className)}>
      <ProductImage className={styles.img} product={product} />
      <div>
        <div className={styles.name}>{product.name}</div>
        <Price product={product} />
        <div
          className={styles.remove}
          onClick={() => dispatch(cartActions.remove(product))}
        >
          Удалить
        </div>
      </div>
      <div className={styles.actions}>
        <button
          className={classNames('button', styles.button)}
          disabled={count === 1}
          onClick={() => dispatch(cartActions.decrement(product))}
        >
          -
        </button>
        <div className={styles.count}>{count} шт.</div>
        <button
          className={classNames('button', styles.button)}
          disabled={product.stock === count}
          onClick={() => dispatch(cartActions.increment(product))}
        >
          +
        </button>
      </div>
    </div>
  );
};
