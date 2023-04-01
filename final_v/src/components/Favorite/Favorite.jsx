import styles from './index.module.scss';
import * as api from '../../api';
import { useQuery } from 'react-query';
import { Loading } from '../Loading/Loading';
import { authSelectors } from '../../store/auth';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { urls } from '../../router/paths';
import { CatalogItem } from '../CatalogItem/CatalogItem';
import { useSignIn } from '../../hooks/signin';
import { favoriteSelectors } from '../../store/favorite';

export const Favorite = () => {
  const token = useSelector(authSelectors.token);
  const ids = useSelector(favoriteSelectors.selectIds);
  useSignIn();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['favorite', ids],
    queryFn: () => api.getProductsByIds({ ids, token }),
  });

  if (isLoading) {
    return <Loading className={styles.root} />;
  }

  if (isError) {
    return <div className={styles.root}>Ошибка загрузки</div>;
  }

  if (isSuccess) {
    return (
      <div className={styles.root}>
        {!ids.length && (
          <div className={styles.empty}>
            <div>В избранном пусто</div>
            <Link to={urls.CATALOG}>В каталог</Link>
            <Link to={urls.PROFILE}>Мой профиль</Link>
          </div>
        )}
        {
          <div className={styles.items}>
            {data.map((product) => (
              <CatalogItem
                key={product._id}
                product={product}
                className={styles.item}
              />
            ))}
          </div>
        }
      </div>
    );
  }
};
