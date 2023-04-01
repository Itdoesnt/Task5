export const routerPaths = {
  SIGNIN: 'signin',
  SIGNUP: 'signup',
  PROFILE: 'profile',
  CATALOG: 'catalog',
  CART: 'cart',
  FAVORITE: 'favorite',
  DETAIL: 'detail/:id',
  NEW: 'new',
};

export const urls = {
  SIGNIN: `/${routerPaths.SIGNIN}`,
  SIGNUP: `/${routerPaths.SIGNUP}`,
  PROFILE: `/${routerPaths.PROFILE}`,
  CATALOG: `/${routerPaths.CATALOG}`,
  CART: `/${routerPaths.CART}`,
  FAVORITE: `/${routerPaths.FAVORITE}`,
  NEW: `/${routerPaths.NEW}`,
  DETAIL: (id) => `/detail/${id}`,
};