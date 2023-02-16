import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import basketReducer from '../features/basket/basketSlice';
import restaurantReducer from '../features/restaurant/restaurantSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    basket: basketReducer,
    restaurant: restaurantReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
