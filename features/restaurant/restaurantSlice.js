import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: { id: null },
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setCurrentId(state, action) {
      state.current = action.payload;
    },
  },
});

export const { setCurrentId } = restaurantSlice.actions;

export const selectCurrentRestaurant = state => state.restaurant.current;

export default restaurantSlice.reducer;
