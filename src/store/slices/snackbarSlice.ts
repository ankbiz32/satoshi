import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SnackbarState {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  open: boolean;
}

const initialState: SnackbarState = {
  message: '',
  severity: 'info',
  open: false,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ message: string; severity?: SnackbarState['severity'] }>
    ) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity || 'info';
      state.open = true;
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
