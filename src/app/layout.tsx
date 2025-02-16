import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Google Calendar Clone',
  description: 'A clone of Google Calendar built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}