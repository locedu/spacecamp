import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedUserId: null, // Default to no selected user
};

const profileSlice = createSlice({
  name: 'profile', // Name of the slice
  initialState,
  reducers: {
    // Action to set selectedUserId
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload; // Set the user ID
    },
    // Action to reset selectedUserId
    resetSelectedUserId: (state) => {
      state.selectedUserId = null; // Reset to no selected user
    },
  },
});

// Export actions
export const { setSelectedUserId, resetSelectedUserId } = profileSlice.actions;

// Export the reducer
export default profileSlice.reducer;
