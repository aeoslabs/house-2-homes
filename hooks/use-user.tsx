// import { useEffect, useState, createContext, useContext } from "react";
// import {
//   useUser as useSupaUser,
//   useSessionContext,
//   User,
// } from "@supabase/auth-helpers-react";
// import { supabase } from "@/utils/supabase-client";
// // import { UserDetails } from '@/types';

// type UserContextType = {
//   accessToken: string | null;
//   user: User | null;
//   userDetails: any | null;
//   isLoading: boolean;
//   // plan: string | null;
// };

// const UserContext = createContext<UserContextType | undefined>(undefined);

// interface Props {
//   [propName: string]: any;
// }

// const MyUserContextProvider = async (props: Props) => {
//   const {
//     session,
//     isLoading: isLoadingUser,
//     supabaseClient: supabasee,//empty
//   } = useSessionContext();

//   // const { data } = await supabase.auth.getUser();
//   // console.log(data, "data");
//   const user = useSupaUser();
//   // console.log(user, "supauser", session, supabasee, supabase);
//   const accessToken = session?.access_token ?? null;
//   // console.log(accessToken, user);
//   const [isLoadingData, setIsLoadingData] = useState(false);
//   const [userDetails, setUserDetails] = useState<any | null>({ images: [] });
//   const [plan, setPlan] = useState<string | null>(null);

//   const getUserDetails = () => supabasee.from("users").select("*").single();
//   // const getPricingPlan = (productId: string) =>
//   //   supabase
//   //     .from("pricing")
//   //     .select("name")
//   //     .eq("stripe_product_id", productId)
//   //     .single();

//   const updateUserDetails = () => {
//     getUserDetails().then(({ data, error }) => {
//       if (!error && data) {
//         setUserDetails({
//           ...data,
//           images: [
//             "http://res.cloudinary.com/cloudimageapi/image/upload/v1694165806/room_zkvtjh.png",
//           ],
//         } as any);
//         // if (data.subscription_status === "active") {
//         //   getPricingPlan(data.plan).then(
//         //     ({ data: planData, error: planError }) => {
//         //       if (!planError && planData) {
//         //         setPlan(planData.name);
//         //       }
//         //       setIsLoadingData(false);
//         //     }
//         //   );
//         // } else {
//         //   setPlan(null);
//         //   setIsLoadingData(false);
//         // }
//       } else {
//         setIsLoadingData(false);
//       }
//     });
//   };

//   useEffect(() => {
//     if (user && !isLoadingData && !userDetails) {
//       setIsLoadingData(true);
//       updateUserDetails();
//     } else if (!user && !isLoadingUser && !isLoadingData) {
//       setUserDetails({ images: [] });
//     }

//     if (user) {
//       const channel = supabasee
//         .channel("value-db-changes")
//         .on(
//           "postgres_changes",
//           {
//             event: "UPDATE",
//             schema: "public",
//             table: "users",
//           },
//           (payload) => {
//             if (payload.new.id === user.id) {
//               updateUserDetails();
//             }
//           }
//         )
//         .subscribe();

//       return async () => {
//         await supabasee.removeChannel(channel);
//       };
//     }
//     return () => {};
//   }, [user, isLoadingUser]);

//   const value = {
//     accessToken,
//     user,
//     userDetails,
//     isLoading: isLoadingUser || isLoadingData,
//     setUserDetails,
//     // plan,
//   };

//   return <UserContext.Provider value={value} {...props} />;
// };

// const useUser = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useUser must be used within a MyUserContextProvider.");
//   }
//   return context;
// };

// export { MyUserContextProvider, useUser };
