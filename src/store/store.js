
import { configureStore } from '@reduxjs/toolkit';

import { autheSlice } from './auth';
import { journalSlice } from './journal/journalSlice';

export const store = configureStore({
  reducer: {
    auth: autheSlice.reducer,
    journal: journalSlice.reducer
  },
})