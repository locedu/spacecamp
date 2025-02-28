// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
// Import the API slice (if you have an API slice defined using createApi)
import { api } from '../api/api';  // Adjust the path if necessary

// Placeholder reducer for now
const store = configureStore({
  reducer: {
    example: (state = {}, action) => state,  // Placeholder reducer
    [api.reducerPath]: api.reducer,  // RTK Query API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),  // Add RTK Query middleware
});

export default store;
