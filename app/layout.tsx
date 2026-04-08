import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BMG Siddha Hospital | Traditional Siddha Medicine – Dindigul",
  description:
    "BMG Siddha Hospital offers authentic Siddha treatments, herbal medicines, and holistic wellness care at Kuttathupatti, Dindigul. Experience the ancient healing wisdom of Siddha medicine.",
  keywords:
    "BMG Siddha Hospital, Siddha medicine, Siddha treatment, Dindigul, herbal medicine, traditional medicine, holistic healing",
  openGraph: {
    title: "BMG Siddha Hospital",
    description: "Authentic Siddha healing – Dindigul",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
