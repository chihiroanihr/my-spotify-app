import { createContext, useContext, useEffect, useState } from "react";

import { UserDetails, Subscription } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import {
  useSessionContext,
  useUser as useSupaUser, // we use "useUser" hook as custom hook just as in filename "useUser" thus give other variable name
} from "@supabase/auth-helpers-react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

// Create Context
export const UserContext = createContext<UserContextType | undefined>(
  undefined // default
);

export interface Props {
  [propName: string]: any;
}

// Create Provider
export const MyUserContextProvider = (props: Props) => {
  // Define Context
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  // Get user from Supabase DB
  const user = useSupaUser();

  // Get access token
  const accessToken = session?.access_token ?? null;

  // Define States
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  // Functions to fetch data from Supabase DB
  const getUserDetails = () => supabase.from("users").select("*").single(); // return data as single object instead of array of objects
  const getSubscription = () =>
    supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))") // relations
      .in("status", ["trialing", "active"])
      .single();

  // Fetch user information
  useEffect(() => {
    // If user logged in but did not load data yet
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      // Start fetching / loading data
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        // returns an array of results
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }
          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }

          // Fetch finished
          setIsLoadingData(false);
        }
      );
    }

    // If user not logged in / user logged out
    else if (!user && !isLoadingUser && !isLoadingData) {
      // Reset states
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  // If trying to use this hook outside of the context defined then throw an error
  if (context === undefined) {
    throw new Error("useUser must be used within MyUserContextProvider.");
  }

  return context;
};
