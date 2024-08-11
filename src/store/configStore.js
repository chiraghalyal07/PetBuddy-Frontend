import { configureStore } from '@reduxjs/toolkit';
import reviewReducer from '../reducers/reviewReducer';

const store = configureStore({
  reducer: {
    review: reviewReducer,
    // Add other reducers here
  },
});

export default store;