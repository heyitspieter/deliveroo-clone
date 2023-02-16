import { apiSlice } from '../api/apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

const categoryAdapter = createEntityAdapter({});

const initialState = categoryAdapter.getInitialState();

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => '/categories',
      transformResponse: (data = []) => {
        const categories = data.map(category => {
          category.key = category.id;

          return category;
        });

        return categoryAdapter.setAll(initialState, categories);
      },
      providesTags: (result, err, args) =>
        result
          ? [
              { type: 'Category', id: 'LIST' },
              ...result.ids.map(id => ({ type: 'Category', id })),
            ]
          : ['Category'],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApiSlice;

// returns the query result object
export const selectCategoriesResult =
  categoryApiSlice.endpoints.getCategories.select();

// creates memoized selector
const selectCategoriesData = createSelector(
  selectCategoriesResult,
  result => result.data
);

// getSelector creates these selectors by default and we rename them with aliases using destructuring
export const { selectAll: selectAllCategories } = categoryAdapter.getSelectors(
  state => selectCategoriesData(state) ?? initialState
);
