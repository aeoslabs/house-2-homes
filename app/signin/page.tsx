// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { getURL } from "@/utils/helpers";
// import dynamic from "next/dynamic";
// import CenteredSpinner from "@/components/ui/centered-spinner";
// import { Auth } from "@supabase/auth-ui-react";
// import { useUser } from "@supabase/auth-helpers-react";
// // export async function getServerSideProps(context: any) {
// //   if (process.env.NEXT_PUBLIC_IS_MAINTENANCE === "true") {
// //     return {
// //       redirect: {
// //         permanent: false,
// //         destination: "/maintenance",
// //       },
// //     };
// //   } else {
// //     return {
// //       props: {},
// //     };
// //   }
// // }

// // const Auth = dynamic(
// //   () => import("@supabase/auth-ui-react").then((mod) => mod.Auth),
// //   {
// //     ssr: false,
// //     loading: () => <div />,
// //   }
// // );

// const SignIn = () => {
//   const router = useRouter();
//   const user = useUser();
//   const supabaseClient = createClientComponentClient();
//   console.log(supabaseClient);
//   useEffect(() => {
//     if (user) {
//       router.replace("/");
//     }
//   }, [user]);

//   return (

//   );
// };
// export default SignIn;

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import SignInComponent from "@/components/signin/signInComponent";

export default async function SignIn() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  const { data } = await supabase.from("users").select("*");
  console.log(session, error, "supabase", data);
  return <SignInComponent session={session} />;
}
