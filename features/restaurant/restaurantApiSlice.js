import { apiSlice } from '../api/apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

const restaurantAdapter = createEntityAdapter({});

const initialState = restaurantAdapter.getInitialState();

export const restaurantApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRestaurants: builder.query({
      query: () => '/restaurants',
      transformResponse: (data = []) => {
        const restaurants = data.map(restaurant => {
          restaurant.key = restaurant.id;

          return restaurant;
        });

        return restaurantAdapter.setAll(initialState, restaurants);
      },
      providesTags: (result, err, args) =>
        result
          ? [
              { type: 'Restaurant', id: 'LIST' },
              ...result.ids.map(id => ({ type: 'Restaurant', id })),
            ]
          : ['Restaurant'],
    }),
  }),
});

export const { useGetRestaurantsQuery } = restaurantApiSlice;

// returns the query result object
export const selectRestaurantsResult =
  restaurantApiSlice.endpoints.getRestaurants.select();

// creates memoized selector
const selectRestaurantsData = createSelector(
  selectRestaurantsResult,
  result => result.data
);

// getSelector creates these selectors by default and we rename them with aliases using destructuring
export const { selectAll: selectAllRestaurants } =
  restaurantAdapter.getSelectors(
    state => selectRestaurantsData(state) ?? initialState
  );
