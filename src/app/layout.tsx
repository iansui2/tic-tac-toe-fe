// app/layout.tsx
import { Providers } from './providers'
import Head from 'next/head';
import AppLayout from '../layouts/AppLayout';

export const metadata = {
  title: "Tic Tac Toe",
  description: "Tic Tac Toe Game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  )
}