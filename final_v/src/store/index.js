import {
  configureStore
} from '@reduxjs/toolkit';

import {
  authReducer
} from './auth';
import {
  catalogReducer
} from './catalog';
import persistState from 'redux-localstorage';
import {
  cartReducer
} from './cart';
import {
  favoriteReducer
} from './favorite';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    catalog: catalogReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
  },
  enhancers: [persistState()],
});