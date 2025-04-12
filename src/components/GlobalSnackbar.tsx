'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert, Slide, SlideProps } from '@mui/material';
import { hideSnackbar } from '@/store/slices/snackbarSlice';
import { AppDispatch, RootState } from '@/store';
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export default function GlobalSnackbar() {
  const dispatch = useDispatch<AppDispatch>();
  const { open, message, severity } = useSelector((state:RootState) => state.snackbar);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => dispatch(hideSnackbar())}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      slots={{ transition: SlideTransition }}
    >
      <Alert onClose={() => dispatch(hideSnackbar())} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
