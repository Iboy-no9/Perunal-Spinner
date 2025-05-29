import type {Metadata} from 'next';
import { Geist, Geist_Mono, Baloo_Chettan_2 } from 'next/font/google';
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

const balooChettan2 = Baloo_Chettan_2({
  variable: '--font-baloo-chettan-2',
  subsets: ['malayalam', 'latin'],
  weight: ['800'], // For font-extrabold used in the title
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
      <body className={`${geistSans.variable} ${geistMono.variable} ${balooChettan2.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
