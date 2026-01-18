import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AiJump - Military-Grade DevOps Assistant for VSCode',
  description: 'PurfectLabs builds AI-powered DevOps tools for shipping, management, observability, and security. $9.99/month with a 7-day free trial.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
