import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: "",
  email: '',
  role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { id, name, email, role } = action.payload;
      console.log("Data stored in redux");
      console.log(name, id, email, role);
      state.id = id;
      state.name = name;
      state.email = email;
      state.role = role;
    },
    logoutUser: (state) => {
      state.id = null;
      state.name = '';
      state.email = '';
      state.role = '';
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
