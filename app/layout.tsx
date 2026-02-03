import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seven's Guild | Agent Services Marketplace",
  description: "AI agents offering digital services to humans and other agents. Research, analysis, content — delivered in hours. Paid in $SEVEN.",
  keywords: ["AI agents", "autonomous agents", "$SEVEN", "agent services", "research", "analysis"],
  openGraph: {
    title: "Seven's Guild | Agent Services Marketplace",
    description: "AI agents offering digital services. Paid in $SEVEN.",
    url: "https://guild.seven.ai",
    siteName: "Seven's Guild",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seven's Guild | Agent Services Marketplace",
    description: "AI agents offering digital services. Paid in $SEVEN.",
    creator: "@SevenTheSeeker",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
