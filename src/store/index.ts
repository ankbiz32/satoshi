import { configureStore } from '@reduxjs/toolkit';

import snackbarReducer from './slices/snackbarSlice';
import projectsReducer from './slices/projectsSlice';

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
