// app/layout.tsx (Server Component - NO "use client")

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TabTitleHandler from "@/components/TabTitleHandler";
import Script from 'next/script';
// import ClientLayout from "@/components/ClientLayout"; // Import the new client wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- METADATA STAYS HERE ---
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: "Sun Tea Mix | Best Boba, Soufflé Pancakes & Desserts in Honolulu",
  description: "Takeaway & Delivery Available. Refreshing Boba, Soufflé Pancakes, Smoothies. Serving the Best Boba & Desserts in Honolulu. Savor the Best Bubble Tea & Soufflé Pancakes Near You! 4.5 ★ average from 374 reviews across all platforms. Located at 400 Keawe St, Honolulu, HI 96813. Open Daily: 11:00 AM – 9:00 PM.",
  keywords: [
    "bubble tea", "boba bubble tea near me", "bubble tea shop near me", "bubble tea store", "bubble tea honolulu", "bubble tea waikiki", "bubble tea delivery", "bubble tea catering", "milk tea honolulu", "bubble tea open now", "bubble tea places near me", "bubble tea near me now",
    "fruit tea", "fruit tea near me", "fortune tea hawaii", "fruit tea drink", "fruit tea bubbles",
    "milk tea", "milk tea near me", "milk tea taro", "milk tea thai", "milk tea flavors", "milk tea delivery", "milk tea mix", "milk tea places near me", "milk tea shop", "milk tea menu", "milk tea open now near me", "milk tea open near me", "milk tea ingredients",
    "boba near me", "boba", "boba tea near me", "boba tea", "boba shops near me", "boba house", "boba places near me", "boba cafe", "boba tea protein", "boba places", "boba pops", "boba near me open now", "boba drink", "boba protein", "boba shop", "boba milk tea",
    "bubble tea near me", "bubble tea", "bubble tea shop", "bubble tea cafe", "bubble tea places near me",
    "smoothie", "smoothie recipes", "smoothie bowls near me", "smoothie place near me", "smoothie bowl", "smoothie bar near me", "smoothie king acai bowl", "smoothie shop near me", "smoothie delivery near me",
    "dessert honolulu", "dessert places near me", "dessert open now near me", "dessert cafe", "dessert places honolulu", "souffle pancakes",
    "yoghurt smoothie honolulu", "yoghurt smoothie", "yogurt smoothie drinks", "smoothie yogurt and frozen fruit", "yoghurt banana smoothie", "yoghurt berry smoothie", "yoghurt based smoothie", "yogurt in smoothie bowl", "yogurt shakes smoothies",
    "pancake", "pancakes", "pancakes near me", "pancake recipe", "pancake house", "pancake house near me", "pancake japanese", "pancake restaurant", "souffle pancakes", "souffle pancakes honolulu", "souffle pancakes waikiki", "souffle pancakes oahu", "souffle pancakes restaurant near me"
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Sun Tea Mix | Best Boba, Soufflé Pancakes & Desserts in Honolulu",
    description: "Takeaway & Delivery Available. Refreshing Boba, Soufflé Pancakes, Smoothies. Serving the Best Boba & Desserts in Honolulu. Savor the Best Bubble Tea & Soufflé Pancakes Near You! 4.5 ★ average from 374 reviews across all platforms. Located at 400 Keawe St, Honolulu, HI 96813. Open Daily: 11:00 AM – 9:00 PM.",
    url: "https://sun-tea-mix.vercel.app/",
    siteName: "Sun Tea Mix Honolulu",
    images: [
      {
        url: "/Images/Logo.webp",
        width: 400,
        height: 400,
        alt: "Sun Tea Mix Logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@SunTeaMix808",
    title: "Sun Tea Mix | Best Boba, Soufflé Pancakes & Desserts in Honolulu",
    description: "Takeaway & Delivery Available. Refreshing Boba, Soufflé Pancakes, Smoothies. Serving the Best Boba & Desserts in Honolulu. Savor the Best Bubble Tea & Soufflé Pancakes Near You! 4.5 ★ average from 374 reviews across all platforms.",
    images: ["/Images/Logo.webp"]
  }
};
// --- END METADATA ---


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;


  return (
    <html lang="en">
      <head>

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TabTitleHandler />

        {children}
        {/* <ClientLayout>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ClientLayout> */}


        {gaMeasurementId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                   window.dataLayer = window.dataLayer || [];
                   function gtag(){dataLayer.push(arguments);}
                   gtag('js', new Date());
                   gtag('config', '${gaMeasurementId}');
                 `
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}