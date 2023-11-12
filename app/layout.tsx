import { MyUserContextProvider } from "@/hooks/use-user";
import SupabaseProvider from "@/hooks/use-supabase";
import "./globals.css";
import type { Metadata } from "next";
import { FormSelectionContextProvider } from "@/hooks/use-form-selection";
import { Toaster } from "@/components/ui/toaster";
import { poppins } from "./fonts";

export const dynamic = "force-dynamic";

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
            <body className={`${poppins.className} bg-white`}>
              <main>{children}</main>
              <Toaster />
            </body>
          </FormSelectionContextProvider>
        </MyUserContextProvider>
      </SupabaseProvider>
    </html>
  );
}
