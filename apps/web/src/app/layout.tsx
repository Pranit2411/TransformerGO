import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TransformerGO",
  description: "Transformer Parameter Calculator & ML Error Predictor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0f1e] text-[#e2e8f0] antialiased">
        {children}
      </body>
    </html>
  );
}