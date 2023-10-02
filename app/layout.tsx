import { MyUserContextProvider } from "@/hooks/use-user";
import SupabaseProvider from "@/hooks/use-supabase";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FormSelectionContextProvider } from "@/hooks/use-form-selection";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SupabaseProvider>
        <MyUserContextProvider>
          <FormSelectionContextProvider>
            <body className={inter.className}>
              <main>{children}</main>
              <Toaster />
            </body>
          </FormSelectionContextProvider>
        </MyUserContextProvider>
      </SupabaseProvider>
    </html>
  );
}
