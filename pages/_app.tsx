import "../styles/globals.css";
import type { AppProps } from "next/app";

// components and contexts import
import ToastWrapper from "@/components/ToastWrapper";
import { AuthProvider } from "@/contexts/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastWrapper />
    </AuthProvider>
  );
}

export default MyApp;
