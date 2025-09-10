import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import RootClientProvider from './RootClientProvider';
import Script from "next/script";

const geistSans = Geist({variable: '--font-geist-sans', subsets: ['latin']});
const geistMono = Geist_Mono({variable: '--font-geist-mono', subsets: ['latin']});

export const metadata: Metadata = {
    metadataBase: new URL("https://expense-tracker-ten-wine-70.vercel.app/"), // замени на свой домен
    title: "Трекер расходов — учет и аналитика",
    description:
        "Простой и удобный трекер расходов для учета ежемесячных трат и анализа бюджета.",
    openGraph: {
        title: "Трекер расходов — учет и аналитика",
        description:
            "Следи за своими расходами и анализируй бюджет с помощью нашего приложения.",
        url: "https://expense-tracker-ten-wine-70.vercel.app/",
        images: [
            {
                url: "/open-graph.png",
                width: 1200,
                height: 630,
                alt: "Трекер расходов",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Трекер расходов — учет и аналитика",
        description:
            "Удобное приложение для учета расходов и анализа бюджета.",
        images: ["/open-graph.png"],
    },
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google tag (gtag.js) */}
        <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-F9D8PV6Z02"
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F9D8PV6Z02');
          `}
        </Script>

        <RootClientProvider>{children}</RootClientProvider>
        </body>
        </html>
    );
}
