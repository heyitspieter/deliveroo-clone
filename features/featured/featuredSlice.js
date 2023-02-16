import { apiSlice } from '../api/apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

const featuredItemsAdapter = createEntityAdapter({});

const initialState = featuredItemsAdapter.getInitialState();

export const featuredItemsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getFeaturedItems: builder.query({
      query: () => '/featured',
      transformResponse: (data = []) => {
        const featuredItems = data.map(item => {
          item.key = item.id;

          return item;
        });

        return featuredItemsAdapter.setAll(initialState, featuredItems);
      },
      providesTags: (result, err, args) =>
        result
          ? [
              { type: 'FeaturedItems', id: 'LIST' },
              ...result.ids.map(id => ({ type: 'FeaturedItems', id })),
            ]
          : ['FeaturedItems'],
    }),
  }),
});

export const { useGetFeaturedItemsQuery } = featuredItemsApiSlice;

// returns the query result object
export const selectFeaturedItemsResult =
  featuredItemsApiSlice.endpoints.getFeaturedItems.select();

// creates memoized selector
const selectFeaturedItemsData = createSelector(
  selectFeaturedItemsResult,
  result => result.data
);

// getSelector creates these selectors by default and we rename them with aliases using destructuring
export const { selectAll: selectAllFeaturedItems } =
  featuredItemsAdapter.getSelectors(
    state => selectFeaturedItemsData(state) ?? initialState
  );
