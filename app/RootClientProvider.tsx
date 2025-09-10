'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import ClerkThemeProvider from '@/components/ClerkThemeProvider';
import I18nProvider from '@/contexts/i18nProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <ClerkThemeProvider>
        <I18nProvider>
          <Navbar />
          {children}
          <Footer />
        </I18nProvider>
      </ClerkThemeProvider>
    </ThemeProvider>
  );
}
