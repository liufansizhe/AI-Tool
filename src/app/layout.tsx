import "./globals.css";

import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";
import { getMetadataForRoute } from "@/lib/getMetadata";

export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
  return getMetadataForRoute(params);
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className='antialiased min-h-screen flex flex-col'>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
