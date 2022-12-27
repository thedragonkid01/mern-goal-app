import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userLogin, thunkAPI) => {
    try {
      return await authService.login(userLogin);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ? user : null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.user = null;
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
