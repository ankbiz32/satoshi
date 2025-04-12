'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import GlobalSnackbar from '@/components/GlobalSnackbar';

export default function ClientOnlyProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <GlobalSnackbar />
    </Provider>
  );
}
