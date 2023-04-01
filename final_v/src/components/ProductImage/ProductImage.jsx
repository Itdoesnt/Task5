import { Link } from 'react-router-dom';
import { urls } from '../../router/paths';
import styles from './index.module.scss';

export const ProductImage = ({ product, className }) => {
  return (
    <Link to={urls.DETAIL(product._id)} className={className}>
      <img src={product.pictures} alt="" className={styles.img} />
    </Link>
  );
};
