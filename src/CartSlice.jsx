import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const incomingItem = action.payload;
      const existingItem = state.items.find((item) => item.name === incomingItem.name);

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.items.push({
        ...incomingItem,
        quantity: 1,
      });
    },
    removeItem: (state, action) => {
      const itemName = action.payload;
      state.items = state.items.filter((item) => item.name !== itemName);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);

      if (!existingItem) {
        return;
      }

      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.name !== name);
        return;
      }

      existingItem.quantity = quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
