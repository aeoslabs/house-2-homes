"use client";

import { cormorant } from "@/app/fonts";
import { downloadImage } from "@/lib/utils";
import { Database } from "@/types/supabase";
import CreditCount from "../ui/credit-count";
import Link from "next/link";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/use-user";

type Image = Database["public"]["Tables"]["generations"]["Row"];

type Props = {
  images: Image[];
};

const AccountComponent = (props: Props) => {
  const { images } = props;

  const { user } = useUser();
  return (
    <section className="mb-32">
      <div className="max-w-6xl px-4 py-20 space-y-20 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="flex flex-col space-y-2">
          <h1 className={`${cormorant.className} text-6xl sm:text-4xl`}>
            Account
          </h1>
          <p className="mt-5 text-xl text-gray-700 font-thin">
            Manage your account details and subscriptions here.
          </p>
        </div>

        {user && (
          <div className="flex flex-col gap-8 mt-12">
            <div>
              <h5 className="text-gray-500">Your Name</h5>
              <h1 className={`${cormorant.className} text-4xl sm:text-2xl`}>
                {user.user_metadata.full_name}
              </h1>
            </div>
            <div>
              <h5 className="text-gray-500">Your E-Mail</h5>
              <h1 className={`${cormorant.className} text-4xl sm:text-2xl`}>
                {user.email}
              </h1>
            </div>

            <>
              <div>
                <h5 className="text-gray-500">Your subscription status</h5>

                <div className="flex flex-row space-x-2 align-middle">
                  <h3 className="text-2xl font-extrabold text-yellow-400">
                    Inactive
                  </h3>
                  <Link href="/pricing">
                    <Button variant="link" size="lg" className="p-0">
                      Subscribe now
                    </Button>
                  </Link>
                </div>
              </div>

              <div>
                <h5 className="text-gray-500 dark:text-gray-400">Credits</h5>
                <div className="flex flex-row space-x-2  align-middle">
                  <CreditCount count={5} fontSize="text-2xl" />
                </div>
              </div>
            </>
          </div>
        )}
      </div>
    </section>
  );
};

export default AccountComponent;
