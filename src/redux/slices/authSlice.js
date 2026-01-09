import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
  coins: 0,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.coins = action.payload.coins;
      state.loading = false;
    },
    setCoins: (state, action) => {
      state.coins = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.coins = 0;
      state.loading = false;
    },
  },
});

export const { setUser, setCoins, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
