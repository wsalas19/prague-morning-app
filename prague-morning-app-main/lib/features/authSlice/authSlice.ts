import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
};

export const signIn = createAsyncThunk(
    'user/sign-in',
    async (userBody: any, { rejectWithValue }): Promise<any> => {
      try {
        const response: any = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userBody),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}, ${response.statusText}`);
        }
  
        const data = await response.json();
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signIn.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      console.log("enter",action.payload);

      localStorage.setItem('token', JSON.stringify(action.payload.token));
    });
    builder.addCase(signIn.rejected, (state, action) => {
        state.user = null; // Clear the user data
        state.loading = false;
        localStorage.removeItem('token');
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
