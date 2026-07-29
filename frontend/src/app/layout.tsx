import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisitorTracker } from "@/components/utils/VisitorTracker";
import { Chatbot } from "@/components/ui/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Enfinite Energy | Best Solar Panel Installation Company",
    template: "%s | Enfinite Energy",
  },
  description: "Enfinite Energy is a top solar panel installation company providing smart rooftop solar solutions for homes, businesses, and agriculture in India. Save up to 100% on electricity bills and get subsidies under PM Surya Ghar Yojana.",
  keywords: [
    "solar panel installation", 
    "best solar company in India", 
    "solar panel for home", 
    "rooftop solar installation", 
    "commercial solar panels", 
    "PM Surya Ghar Yojana apply", 
    "Enfinite Energy", 
    "solar EPC contractor", 
    "solar subsidy in India",
    "solar panel price",
    "solar installation services near me",
    "top solar installers",
    "industrial solar solutions",
    "solar water pump agriculture",
    "free solar panel government scheme",
    "solar inverter and battery"
  ],
  authors: [{ name: "Enfinite Energy Pvt. Ltd." }],
  openGraph: {
    title: "Enfinite Energy | Best Solar Panel Installation Services",
    description: "Install solar panels for your home or business with Enfinite Energy. Save up to 100% on electricity bills with PM Surya Ghar Yojana. Get a free quote today!",
    siteName: "Enfinite Energy",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enfinite Energy | Smart Solar Solutions",
    description: "Leading solar EPC company in India. Get reliable rooftop solar solutions and massive electricity bill savings.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <VisitorTracker />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
