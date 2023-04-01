import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './index.module.scss';
import * as api from '../../api';
import { useMutation } from 'react-query';
import { authSelectors } from '../../store/auth';
import { useSelector } from 'react-redux';
import { useSignIn } from '../../hooks/signin';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { urls } from '../../router/paths';
import { getProductId } from '../../helpers/get-product-id';

export const New = () => {
  const navigate = useNavigate();
  const token = useSelector(authSelectors.token);
  useSignIn();

  const { mutate } = useMutation({
    mutationFn: (data) => api.createProduct({ token, data }),
    onSuccess: (product) => {
      navigate(urls.DETAIL(getProductId(product)));
    },
  });

  const initialValues = {
    name: '',
    description: '',
    price: 0,
    discount: 0,
    available: true,
    pictures: '',
    stock: 1,
    wight: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(3).required(),
    description: Yup.string().min(3).required(),
    price: Yup.number().min(1).required(),
    discount: Yup.number().min(0).max(100).required(),
    available: Yup.boolean().required(),
    pictures: Yup.string().required(),
    stock: Yup.number().min(1).required(),
    wight: Yup.string().min(3).required(),
  });

  return (
    <div className={styles.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data) => mutate(data)}
      >
        {(formik) => (
          <Form className={styles.form}>
            <h2>Создать новый товар</h2>
            <label className={styles.row}>
              <div className={styles.caption}>Name:</div>
              <div>
                <Field name="name" className={styles.control} />

                <ErrorMessage
                  name="name"
                  className={styles.error}
                  component="div"
                />
              </div>
            </label>

            <label className={styles.row}>
              <div className={styles.caption}>Description:</div>
              <div>
                <Field name="description" className={styles.control} />
                <ErrorMessage
                  name="description"
                  className={styles.error}
                  component="div"
                />
              </div>
            </label>

            <label className={styles.row}>
              <div className={styles.caption}>Price:</div>
              <div>
                <Field
                  type="number"
                  name="price"
                  min="0"
                  className={styles.control}
                />
                <ErrorMessage
                  name="price"
                  className={styles.error}
                  component="div"
                />
              </div>
            </label>

            <label className={styles.row}>
              <div className={styles.caption}>Discount:</div>
              <div>
                <Field
                  type="number"
                  name="discount"
                  min="0"
                  max="100"
                  className={styles.control}
                />
                <ErrorMessage
                  name="discount"
                  className={styles.error}
                  component="div"
                />
              </div>
            </label>

            <label className={styles.row}>
              <div className={styles.caption}>Available:</div>
              <div>
                <Field
                  type="checkbox"
                  name="available"
                  className={styles.control}
                />
                <ErrorMessage
                  name="available"
                  className={styles.error}
                  component="div"
                />
              </div>
            </label>

            <label className={styles.row}>
              <div className={styles.caption}>Pictures:</div>
              <div>
                <Field name="pictures" className={styles.control} />
                <ErrorMessage
                  name="pictures"
                  className={styles.error}
                  component="div"
                />
              </div>
            </label>

            <label className={styles.row}>
              <div className={styles.caption}>Stock:</div>
              <div>
                <Field
                  type="number"
                  name="stock"
                  min="0"
                  className={styles.control}
                />
                <ErrorMessage
                  name="stock"
                  className={styles.error}
                  component="div"
                />
              </div>
            </label>

            <label className={styles.row}>
              <div className={styles.caption}>Wight:</div>
              <div>
                <Field name="wight" className={styles.control} />
                <ErrorMessage
                  name="wight"
                  className={styles.error}
                  component="div"
                />
              </div>
            </label>

            <div className={styles.row}>
              <div className={styles.caption}></div>
              <button
                className={classNames('button', styles.create)}
                type="submit"
                disabled={!formik.dirty || Object.keys(formik.errors).length}
              >
                Создать
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
