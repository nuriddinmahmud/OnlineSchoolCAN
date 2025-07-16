import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: null | string;
  user: any;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      AsyncStorage.setItem("token", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.token = null;
      AsyncStorage.removeItem("token");
    },
  },
});

export const { register, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
