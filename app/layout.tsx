import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AiJump - Military-Grade DevOps Assistant for VSCode',
  description: 'Infrastructure-as-Code automation for Terraform, Docker, and Kubernetes. $7.99/month with 7-day free trial.',
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
