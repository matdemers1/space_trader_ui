'use client'

import { Inter } from 'next/font/google'
import {ReactNode} from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import {RootProvider} from "@/context/rootContext";

const inter = Inter({ subsets: ['latin'] })

interface LayoutProps {
  children: ReactNode
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function RootLayout({ children }: LayoutProps) {
  return (
    <RootProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
      </ThemeProvider>
    </RootProvider>
  );
}
