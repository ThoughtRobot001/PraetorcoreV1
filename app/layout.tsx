import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/content/site';

const manrope = localFont({
  src: '../public/fonts/manrope-latin-variable.woff2',
  weight: '400 700',
  variable: '--font-manrope',
  display: 'swap',
});

// Absolute base for Open Graph/Twitter image URLs (app/opengraph-image.png).
function resolveMetadataBase(): URL | undefined {
  try {
    return process.env.APP_URL ? new URL(process.env.APP_URL) : undefined;
  } catch {
    return undefined;
  }
}

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: {
    default: `Home | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    'Tech training in data analytics, cybersecurity and software development, plus services for businesses. Home of Tech4Youth.',
  openGraph: {
    title: `Home | ${siteConfig.name}`,
    description:
      'Tech training in data analytics, cybersecurity and software development, plus services for businesses. Home of Tech4Youth.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Home | ${siteConfig.name}`,
    description:
      'Tech training in data analytics, cybersecurity and software development, plus services for businesses. Home of Tech4Youth.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.addEventListener('error', function(event) {
                  if (
                    (event.filename && (event.filename.indexOf('chrome-extension://') !== -1 || event.filename.indexOf('moz-extension://') !== -1)) ||
                    (event.message && (event.message.indexOf('MetaMask') !== -1 || event.message.indexOf('ethereum') !== -1))
                  ) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                  }
                }, true);
                window.addEventListener('unhandledrejection', function(event) {
                  var reason = event.reason;
                  if (
                    reason && (
                      String(reason).indexOf('MetaMask') !== -1 ||
                      (reason.stack && (reason.stack.indexOf('chrome-extension://') !== -1 || reason.stack.indexOf('moz-extension://') !== -1))
                    )
                  ) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                  }
                }, true);
              }
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
