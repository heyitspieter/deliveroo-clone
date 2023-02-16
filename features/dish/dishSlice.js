import { apiSlice } from '../api/apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

const dishAdapter = createEntityAdapter({});

const initialState = dishAdapter.getInitialState();

export const dishApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDishes: builder.query({
      query: () => '/dishes',
      transformResponse: (data = []) => {
        const dishes = data.map(dish => {
          dish.key = dish.id;

          return dish;
        });

        return dishAdapter.setAll(initialState, dishes);
      },
      providesTags: (result, err, args) =>
        result
          ? [
              { type: 'Dish', id: 'LIST' },
              ...result.ids.map(id => ({ type: 'Dish', id })),
            ]
          : ['Dish'],
    }),
  }),
});

export const { useGetDishesQuery } = dishApiSlice;

// returns the query result object
export const selectDishesResult = dishApiSlice.endpoints.getDishes.select();

// creates memoized selector
const selectDishesData = createSelector(
  selectDishesResult,
  result => result.data
);

// getSelector creates these selectors by default and we rename them with aliases using destructuring
export const { selectAll: selectAllDishes } = dishAdapter.getSelectors(
  state => selectDishesData(state) ?? initialState
);
