import styles from './index.module.scss';
import * as api from '../../api';
import { useQuery } from 'react-query';
import { Loading } from '../Loading/Loading';
import { authSelectors } from '../../store/auth';
import { useSelector } from 'react-redux';
import { useSignIn } from '../../hooks/signin';
import { useParams } from 'react-router-dom';
import { Price } from '../Price/Price';
import { AddButton } from '../AddButton/AddButton';
import { AddToFavorite } from '../AddToFavorite/AddToFavorite';

export const Detail = () => {
  const token = useSelector(authSelectors.token);
  const params = useParams();
  const id = params.id;

  const {
    isSuccess,
    isLoading,
    isError,
    data: product,
  } = useQuery(['detail', id], () => api.getProductById({ token, id }));

  useSignIn();

  if (isLoading) {
    return <Loading className={styles.root} />;
  }

  if (isError) {
    return <div className={styles.root}>Ошибка загрузки</div>;
  }

  if (isSuccess) {
    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <img className={styles.img} src={product.pictures} alt="" />
        </div>
        <div className={styles.right}>
          <div className={styles.name}>{product.name}</div>
          <Price className={styles.price} product={product} />
          <div className={styles.buttons}>
            <AddButton className={styles.add} product={product} />
            <AddToFavorite product={product} />
          </div>
        </div>
      </div>
    );
  }
};
