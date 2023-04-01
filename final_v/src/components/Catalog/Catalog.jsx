import classNames from 'classnames';
import styles from './index.module.scss';
import * as api from '../../api';
import { useQuery } from 'react-query';
import { Loading } from '../Loading/Loading';
import { CatalogItem } from '../CatalogItem/CatalogItem';
import { authSelectors } from '../../store/auth';
import { catalogSelectors } from '../../store/catalog';
import { useSelector } from 'react-redux';
import { useSignIn } from '../../hooks/signin';
import { Link } from 'react-router-dom';
import { urls } from '../../router/paths';
import { useState } from 'react';

const SORT_BY = {
  NAME: 'name',
  PRICE: 'price',
};

const SORT_TO = {
  ASC: 'asc',
  DESC: 'desc',
};

export const Catalog = () => {
  const token = useSelector(authSelectors.token);
  const search = useSelector(catalogSelectors.search);
  const [sortBy, setSortBy] = useState(SORT_BY.NAME);
  const [sortTo, setSortTo] = useState(SORT_TO.ASC);

  const { isSuccess, isLoading, isError, data } = useQuery(
    ['products', search],
    () => api.searchProducts({ token, search })
  );

  useSignIn();

  if (isLoading) {
    return <Loading className={styles.root} />;
  }

  if (isError) {
    return <div className={styles.root}>Ошибка загрузки</div>;
  }

  if (isSuccess) {
    const sortFactor = sortTo === SORT_TO.ASC ? -1 : 1;

    const products = data.slice().sort((a, b) => {
      if (sortBy === SORT_BY.NAME) {
        return a.name.localeCompare(b.name) * sortFactor;
      }
      if (sortBy === SORT_BY.PRICE) {
        return (a.price - b.price) * sortFactor;
      }
      return 0;
    });

    return (
      <div className={styles.root}>
        <div className={styles.panel}>
          <div className={styles.found}>Найдено: {data.length} товаров</div>
          <span>Сортировать по:</span>
          <select name="sort_by" onChange={(e) => setSortBy(e.target.value)}>
            <option value={SORT_BY.NAME}>Названию</option>
            <option value={SORT_BY.PRICE}>Цене</option>
          </select>
          <select name="sort_to" onChange={(e) => setSortTo(e.target.value)}>
            <option value={SORT_TO.ASC}>По возрастанию</option>
            <option value={SORT_TO.DESC}>По убыванию</option>
          </select>
          <Link
            className={classNames('button', styles.buttonNew)}
            to={urls.NEW}
          >
            Новый
          </Link>
        </div>

        <div className={styles.items}>
          {products.map((product) => (
            <CatalogItem
              key={product._id}
              product={product}
              className={styles.item}
            />
          ))}
        </div>
      </div>
    );
  }
};
