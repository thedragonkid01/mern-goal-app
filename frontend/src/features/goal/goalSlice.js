import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "./goalService";

export const getGoals = createAsyncThunk(
  "goal/getGoals",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getGoals(token);
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

export const addGoal = createAsyncThunk(
  "goal/addGoal",
  async (goal, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.addGoal(goal, token);
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

export const deleteGoal = createAsyncThunk(
  "goal/deleteGoal",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(id, token);
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

const initialState = {
  goals: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => {
      state.goals = [];
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.goals = [];
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(addGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(addGoal.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
