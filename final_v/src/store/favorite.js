import {
  createSlice
} from '@reduxjs/toolkit';
import {
  getProductId
} from '../helpers/get-product-id';

const slice = createSlice({
  name: 'favorite',
  initialState: {
    items: {},
  },
  reducers: {
    add(state, {
      payload
    }) {
      const id = getProductId(payload);
      state.items[id] = true;
    },

    remove(state, {
      payload
    }) {
      const id = getProductId(payload);
      state.items[id] = false;
    },
  },
});

export const favoriteReducer = slice.reducer;
export const favoriteActions = slice.actions;
export const favoriteSelectors = {
  isInFavorite: (product) => (state) => {
    const id = getProductId(product);
    return state.favorite.items[id];
  },
  selectIds: (state) => {
    const ids = [];
    const items = state.favorite.items;

    Object.keys(items).forEach((id) => {
      if (items[id]) {
        ids.push(id);
      }
    });

    return ids;
  },
  count: (state) => {
    return favoriteSelectors.selectIds(state).length;
  }
};