import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { getURL } from "@/utils/helpers";
import dynamic from "next/dynamic";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/ui/navbar";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { Check } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useSupabase } from "@/hooks/use-supabase";
import { getSession } from "./supabase-server";
function Generate() {
  // const [panelType, setPanelType] = useState("compact");
  // const radio = [
  //   {
  //     image: "https://picsum.photos/200/200",
  //     value: "compact",
  //   },
  //   {
  //     image: "https://picsum.photos/200/400",
  //     value: "full",
  //   },
  //   {
  //     image: "https://picsum.photos/200/600",
  //     value: "custom",
  //   },
  // ];

  return (
    <>
      {" "}
      <Navbar />
      {/* <section className="relative">
        <div className="flex flex-row w-full h-adjusted">
          <div className="p-4 max-w-xs overflow-y-auto max-h-screen">
            <div className="items-center flex justify-between mt-auto w-72">
              <p>panelType</p>
            </div>
            <div className="flex flex-col flex-1 max-h-full">
              {/* <Images /> */}
      {/* <RadioGroup
                value={panelType}
                onValueChange={setPanelType}
                className="grid grid-cols-3"
              >
                {radio.map(({ image, value }) => (
                  <div
                    className={clsx(
                      "flex items-center relative border-2 border-transparent",
                      value == panelType && "border-gray-950"
                    )}
                  >
                    <RadioGroupItem
                      value={value}
                      id={value}
                      className="absolute w-full h-full opacity-0 cursor-pointer"
                    />

                    <img
                      src={image}
                      alt={value}
                      className="w-full h-full object-cover"
                    />

                    {value === panelType && (
                      <div className="absolute top-0 right-0 p-2 ">
                        <Check size={24} />
                      </div>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <Separator orientation="vertical" />

          <div className="flex flex-col flex-1 space-y-2 h-full">
            <h3 className="text-lg font-extrabold px-4 pt-1.5">Nada</h3>
            <div>
              <Separator />
            </div>
            <div className="max-w-7xl mx-auto"></div>
          </div>
          <p className="absolute bottom-0 rounded-xl bg-brand-900 text-center h-64 lg:hidden py-8 px-4">
            We are currently working on polishing our app for a{" "}
            <strong>better experience on mobile</strong>. In the meanwhile, we
            recommend you switch to Desktop to have the best possible
            experience.
          </p>
        </div> 
      </section> */}
    </>
  );
}
export default Generate;

// const Images = () => {
//   // const { userDetails, setUserDetails } = useUser();
//   const [loading, setLoading] = useState(false);

//   const handleSelectImage = (image) => {
//     setLoading(true);
//     const data = new FormData();
//     data.append("file", image);
//     data.append("upload_preset", "ml_default");
//     data.append("cloud_name", "cloudimageapi");
//     fetch("https://api.cloudinary.com/v1_1/cloudimageapi/image/upload", {
//       method: "post",
//       body: data,
//     })
//       .then((resp) => resp.json())
//       .then((data) => {
//         console.log(data);
//         setUserDetails({
//           ...userDetails,
//           images: [...userDetails?.images, data.url],
//         });
//       })
//       .catch((err) => console.log(err));
//     setLoading(false);
//   };
//   const fileUploadInput = useRef(null);
//   return (
//     <div className="p-2 gap-2 min-h-60 h-60 max-h-60 grid grid-cols-4 grid-rows-2 w-full  rounded">
//       {userDetails?.images?.map((img) => (
//         <img
//           className="flex justify-center object-cover items-center h-full rounded border border-gray-500 border-dashed"
//           src={img}
//         />
//       ))}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => handleSelectImage(e.target.files[0])}
//         className="hidden"
//         ref={fileUploadInput}
//       />
//       <div
//         onClick={() => fileUploadInput.current.click()}
//         className="flex justify-center items-center rounded border border-white border-dashed"
//       >
//         {loading ? "loading..." : "Add Image"}
//       </div>
//     </div>
//   );
// };
