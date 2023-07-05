import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Async action to login and get the token
export const login = createAsyncThunk('/users/profile', async ({ email, password }) => {
  // Make the API request to login
  const response = await axios.get("http://localhost:5000/users/profile");

  return response.body && response.body.user || null;
});
export const logout = createAsyncThunk('/users/logout', async ({ email, password }) => {
  // Make the API request to login
  const response = await axios.get("http://localhost:5000/users/logout");

  return response.body && response.body.user || null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // logout: (state) => {
    //   state.isLoading = false;
    //   state.user = null;
    //   state.error = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = true;
        state.error = null;
        state.user=null;
      })
  },
});

// export const { logout } = authSlice.actions;

export default authSlice.reducer;
