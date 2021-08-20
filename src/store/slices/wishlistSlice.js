import { createSlice } from "@reduxjs/toolkit";
const logoutSave = (state, currentUser) => {
  const temp = JSON.parse(localStorage.getItem("wishlist"));
  localStorage.setItem(
    "wishlist",
    JSON.stringify({
      ...temp,
      [currentUser]: {
        items: state.wishlistItems,
        totalPrice: state.totalPrice,
      },
    })
  );
};
const WishListSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: {},
    currentUser: localStorage.getItem("currentUser"),
    isVisible: false,
  },
  reducers: {
    loadWishListItem: (state, action) => {
      state.currentUser = action.payload;
      if (!state.currentUser) return state;
      const temp = JSON.parse(localStorage.getItem("wishlist"));
      if (!temp) return state;
      if (!temp[state.currentUser]) return state;
      state.wishlistItems = temp[state.currentUser]["items"];
    },
    addWishListItem: (state, action) => {
      if (!state.currentUser) return state;
      state.wishlistItems[action.payload.id] = action.payload;
      logoutSave(state, state.currentUser);
    },
    removeWishlistItem: (state, action) => {
      if (!state.currentUser) return state;
      delete state.wishlistItems[action.payload.id];
      logoutSave(state, state.currentUser);
    },
    toggleVisible: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const {
  addWishListItem,
  removeWishlistItem,
  toggleVisible,
  loadWishListItem,
} = WishListSlice.actions;
export default WishListSlice.reducer;
