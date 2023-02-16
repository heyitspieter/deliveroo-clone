import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const basketAdapter = createEntityAdapter({
  selectId: item => item.id,
});

const initialState = basketAdapter.getInitialState();

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket(state, action) {
      let item = state.entities[action.payload.item.id];
      const { quantity, ...rest } = action.payload.dish;

      if (!item) {
        item = {
          id: action.payload.item.id,
          dishes: [{ ...rest, quantity: 1 }],
        };

        basketAdapter.addOne(state, item);
      } else {
        const index = item.dishes.findIndex(dish => dish.id === rest.id);

        if (index !== -1) {
          if (item.dishes[index].quantity < quantity) {
            item.dishes[index].quantity++;
          }
        } else {
          item.dishes = [...item.dishes, { ...rest, quantity: 1 }];
        }

        basketAdapter.upsertOne(state, item);
      }
    },
    updateQuantity(state, action) {
      let item = state.entities[action.payload.item.id];

      if (item) {
        const index = item.dishes.findIndex(
          dish => dish.id === action.payload.dish.id
        );

        if (index !== -1) {
          if (action.payload.dish.quantity < 1) {
            item.dishes.splice(index, 1);
          } else {
            item.dishes[index].quantity = action.payload.dish.quantity;
          }
        }

        basketAdapter.upsertOne(state, item);
      }
    },
    removeFromBasket(state, action) {
      let item = state.entities[action.payload.item.id];

      if (item) {
        const index = item.dishes.findIndex(
          dish => dish.id === action.payload.dish.id
        );

        if (index !== -1) {
          item.dishes.splice(index, 1);
        }
      }
    },
  },
});

export const { addToBasket, updateQuantity, removeFromBasket } =
  basketSlice.actions;

// getSelector creates these selectors by default and we rename them with aliases using destructuring
export const {
  selectAll: selectAllItems,
  selectById: selectItemById,
  // pass in a selector that returns posts slice of state
} = basketAdapter.getSelectors(state => state.basket);

export const selectBasketTotal = (state, restaurant) =>
  selectItemById(state, restaurant?.id)?.dishes?.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

export const selectBasketTotalItems = (state, restaurant) =>
  selectItemById(state, restaurant?.id)?.dishes?.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

export const selectRestaurantBasketItems = (state, restaurant) =>
  selectItemById(state, restaurant?.id)?.dishes;

export default basketSlice.reducer;
