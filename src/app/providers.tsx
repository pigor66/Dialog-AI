'use client';

import { darkTheme } from '@/theme/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
