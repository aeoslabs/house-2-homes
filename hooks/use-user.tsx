"use client";

// import { Database } from '@/types_db';
import { User } from "@supabase/supabase-js";
import { useEffect, useState, createContext, useContext } from "react";
import { useSupabase } from "./use-supabase";
import { Database } from "@/types/supabase";

const UserContext = createContext<UserContextType | undefined>(undefined);

interface Props {
  [propName: string]: any;
}

type DBUser = Database["public"]["Tables"]["users"]["Row"] | null;

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  additonalUserDetails: DBUser;
  isLoading: boolean;
};

const MyUserContextProvider = (props: Props) => {
  const { supabase, session } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);
  const [additonalUserDetails, setAdditonalUserDetails] =
    useState<DBUser>(null);
  const getUserDetails = () => supabase.from("users").select("*").single();
  const updateUserDetails = () => {
    getUserDetails().then(({ data, error }) => {
      if (!error && data) {
        setAdditonalUserDetails({
          ...data,
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    if (session?.user && !isLoading && !additonalUserDetails) {
      setIsLoading(true);
      updateUserDetails();
    } else if (!session?.user) {
      setAdditonalUserDetails(null);
    }
  }, [session?.user, isLoading]);

  const value = {
    accessToken: session?.access_token || null,
    user: session?.user || null,
    additonalUserDetails,
    isLoading,
  };

  return <UserContext.Provider value={value} {...props} />;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider.");
  }
  return context;
};

export { MyUserContextProvider, useUser };
