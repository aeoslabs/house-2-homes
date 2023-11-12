import { FC } from "react";
import bookLoading from "@/public/loader.json";
import Lottie from "lottie-react";
import { poppins } from "@/app/fonts";

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => {
  return (
    <div
      className="w-full flex flex-col items-center
     justify-center mb-20"
    >
      <Lottie animationData={bookLoading} loop={true} className="w-80" />
      <p className={`${poppins.className} text-md text-center`}>
        Sprinkling some generation magic... Just a moment!
      </p>
    </div>
  );
};

export default Loader;
