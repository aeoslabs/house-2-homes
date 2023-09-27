"use client";

import { ThemeSupa } from "@supabase/auth-ui-shared";
import { getURL } from "@/utils/helpers";
import { Auth } from "@supabase/auth-ui-react";
import { useSupabase } from "@/hooks/use-supabase";

const SignInComponent = () => {
  const { supabase } = useSupabase();

  return (
    <section>
      <div className="flex flex-col justify-center items-center min-h-screen max-w-lg p-3 m-auto w-80 align-middle">
        <div>
          <h6 className="leading-7 mt-2 mb-4 text-center text-gray-400">
            Login to your account
          </h6>
        </div>
        <Auth
          supabaseClient={supabase}
          providers={["google"]}
          onlyThirdPartyProviders={true}
          redirectTo={getURL()}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  defaultButtonText: "white",
                  defaultButtonBackground: "#334155",
                  defaultButtonBorder: "#334155",
                  defaultButtonBackgroundHover: "#64748b",
                },
              },
            },
          }}
          dark
          theme="default"
          localization={{
            variables: {
              sign_in: {
                social_provider_text: "Continue with Google",
              },
            },
          }}
        />
        <span className="text-slate-400 text-xs text-center">
          By signing in, you agree to our{" "}
          <a
            href="https://alphactr.com/terms"
            className="text-gray-200 hover:text-slate-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="https://alphactr.com/privacy-policy"
            className="text-slate-200 hover:text-slate-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          .
        </span>
      </div>
    </section>
  );
};
export default SignInComponent;
