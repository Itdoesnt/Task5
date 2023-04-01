import classNames from 'classnames';
import styles from './index.module.scss';
import { cartActions, cartSelectors } from '../../store/cart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { urls } from '../../router/paths';

export const AddButton = ({ product, className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inCart = useSelector(cartSelectors.itemById(product._id));

  const onAdd = (product) => {
    if (inCart) {
      navigate(urls.CART);
    } else {
      dispatch(cartActions.increment(product));
    }
  };

  return (
    <button
      className={classNames(styles.button, className, {
        [styles.inCart]: !!inCart,
      })}
      onClick={() => onAdd(product)}
    >
      {inCart ? 'Перейти' : 'В корзину'}
    </button>
  );
};
