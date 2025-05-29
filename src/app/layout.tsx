import type {Metadata} from 'next';
import { Geist, Geist_Mono, Chilanka } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const chilanka = Chilanka({
  variable: '--font-chilanka',
  subsets: ['malayalam', 'latin'],
  weight: ['400'], // Chilanka typically comes in regular weight
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Perunnal Spinner',
  description: 'A festive spinning wheel game for Perunnal.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${chilanka.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
