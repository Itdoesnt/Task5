import classNames from 'classnames';
import styles from './index.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { favoriteActions, favoriteSelectors } from '../../store/favorite';

export const AddToFavorite = ({ product, className }) => {
  const isInFavorite = useSelector(favoriteSelectors.isInFavorite(product));
  const dispatch = useDispatch();

  const onAdd = () => {
    if (isInFavorite) {
      dispatch(favoriteActions.remove(product));
    } else {
      dispatch(favoriteActions.add(product));
    }
  };

  return (
    <button
      className={classNames(styles.button, className, {
        [styles.inFavorite]: isInFavorite,
      })}
      onClick={onAdd}
    >
      <span>&#128156;</span>
    </button>
  );
};
