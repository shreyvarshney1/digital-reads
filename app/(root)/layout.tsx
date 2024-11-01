import React from "react";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Metadata } from "next";

// Define a type for the props
type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Digital Reads",
  description: "DigitalReads is a platform for reading and sharing your favorite ebooks.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
      <Footer />
    </div>
  );
}
