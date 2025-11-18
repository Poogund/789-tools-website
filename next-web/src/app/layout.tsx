import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { AuthProvider } from "@/contexts/AuthContext";
import CartSyncProvider from "@/components/CartSyncProvider";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import "./globals.css";
import "./force-navbar.css";
import "../styles/navbar-auth.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="font-main antialiased">
        <AuthProvider>
          <CartSyncProvider>
            <ErrorBoundary>
              <GoogleAnalytics />
              {children}
              <Toaster />
            </ErrorBoundary>
          </CartSyncProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
