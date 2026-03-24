import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://qrstudio.vercel.app'),
  title: "QR Studio — Free QR Code Generator",
  description: "Create custom QR codes for URLs, WiFi, vCards, and more. Free online QR code generator with customization options.",
  keywords: ["QR code", "generator", "free", "QR Studio", "vCard", "WiFi QR", "URL QR"],
  openGraph: {
    title: "QR Studio — Free QR Code Generator",
    description: "Create custom QR codes for URLs, WiFi, vCards, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-gray-950 text-white`}>
        {children}
        <footer className="border-t border-gray-800 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400 mb-4">
              Need more features? Get the full experience with QRForge for iOS
            </p>
            <a
              href="https://apps.apple.com/app/qrforge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Get QRForge for iOS
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
