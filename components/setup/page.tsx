"use client";

import { ThemeSupa } from "@supabase/auth-ui-shared";
import { getURL } from "@/utils/helpers";
import { Auth } from "@supabase/auth-ui-react";
import { useSupabase } from "@/hooks/use-supabase";
import Head from "next/head";
import { cormorant, poppins } from "@/app/fonts";
import { useRef, useState } from "react";
import { ImgComparisonSlider } from "@img-comparison-slider/react";

const images = [
  "room1.jpg",
  "room2.jpg",
  "room3.jpg",
  "room4.jpg",
  "room5.jpg",
  "room6.jpg",
];

const featuresData = [
  {
    title: "Multiple design themes",
    description:
      "Choose from a wide variety of themes to generate stunning visuals for your home exterior, home interior, landscape, or even commercial buildings.",
  },
  {
    title: "Customizable room options",
    description:
      "Select a specific room to customize, from living rooms to kitchens, bedrooms to home theaters, and everything in between.",
  },
  {
    title: "Color palettes for every style",
    description:
      "Each generated image comes with a color palette that you can use to decorate your home or property.",
  },
  {
    title: "Simple interface",
    description:
      "Our easy to use platform makes it simple for you to generate designs and have a great user experience.",
  },
  {
    title: "Virtual Staging",
    description:
      "Say goodbye to expensive physical staging costs! With HouseKraft's virtual staging capabilities, presenting multiple design options becomes seamless.",
  },
  // {
  //   title: "360 Panorama",
  //   description:
  //     "Generate 360 Panoramas to have a detailed idea of how your space should look like.",
  // },
  {
    title: "Generate any vision using text",
    description:
      "Have a specific design in mind? Use your words to generate to make that vision come to life.",
  },
  // {
  //   title: "Mobile-friendly",
  //   description:
  //     "Take pictures of your home or property on the go and upload them to our platform for instant design inspiration.",
  // },
];

const IndexComponent = () => {
  const { supabase } = useSupabase();

  return (
    <div className={`${poppins.className} bg-white`}>
      <Head>
        <title>HouseKraft</title>
      </Head>

      <main className="container mx-auto font-[#212121]">
        {/* Intro section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4 sm:px-6  ">
            <div className="flex items-center justify-between md:flex-col sm:flex-col">
              <div className="mb-8 w-1/2 md:w-full sm:w-full">
                <h1
                  className={`${cormorant.className}  text-8xl  mb-4 sm:text-6xl`}
                >
                  The future of architecture & interior design is here.
                </h1>
                <p className="text-xl mb-8 font-thin font-sl opacity-60">
                  Design your dream living space with your own personal
                  AI-powered architect & interior designer. Create world-class
                  designs...
                </p>
                <div className="flex flex-col items-start gap-2">
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
                  <span className="text-slate-500 text-xs text-center">
                    By signing in, you agree to our{" "}
                    <a
                      href="https://alphactr.com/terms"
                      className="hover:text-slate-600 text-slate-700 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://alphactr.com/privacy-policy"
                      className="hover:text-slate-600 text-slate-700 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </div>
              </div>
              <div className="relative w-[40%]  md:w-full sm:w-full rounded-xl shadow-xl overflow-hidden">
                {/* Placeholder Image */}
                <img
                  src={"/hero.jpg" || undefined}
                  alt="Architectural Design"
                  className=" hover:scale-105 transition duration-500 ease-in-out"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4 sm:px-6 ">
            <SectionHead
              heading="Welcome to HouseKraft: Revolutionizing Interior and Exterior Design
        with AI"
              paragraph="Are you an interior designer or architect seeking a cutting-edge
        solution that will transform your client's homes into any theme they
        desire? Look no further! HouseKraft is here to revolutionize the way
        you approach design, offering unparalleled features and benefits powered
        by artificial intelligence."
            />
            <div className="grid grid-cols-3 gap-8 md:gap-6 md:grid-cols-2 sm:flex sm:flex-col">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-lg shadow-xl overflow-hidden"
                >
                  <img
                    src={image || undefined}
                    alt="Architectural Design"
                    className=" hover:scale-105 transition duration-500 ease-in-out"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Virtual Staging */}
        <section className="relative py-20">
          <div className="container mx-auto px-4 sm:px-6 ">
            <SectionHead
              heading="Transforming Homes Beyond Imagination"
              paragraph="HouseKraft harnesses the power of AI to bring your wildest design ideas to life. With our innovative technology, you can effortlessly create stunning interior and exterior designs that will leave your clients in awe. From modern minimalism to cozy rustic vibes, HouseKraft allows you to explore limitless possibilities and make their dream spaces a reality."
            />
            <div className="grid grid-cols-3 sm:grid-cols-2 gap-8 md:gap-6 md:grid-cols-2 sm:flex sm:flex-col">
              {featuresData.map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#212121] p-8 border rounded-lg hover:shadow-lg hover:bg-[#1c1c1c] transition-transform transform hover:scale-105 transition-shadow duration-300 transition-background-color duration-200"
                >
                  <h3
                    className={`${cormorant.className} text-white text-2xl mb-4`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm font-thin text-slate-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Inspiration */}
        <section className="relative py-20">
          <div className="container mx-auto px-4 sm:px-6  ">
            <SectionHead
              heading="Virtual Staging Made Effortless"
              paragraph="Say goodbye to expensive physical staging costs! With HouseKraft's virtual staging capabilities, presenting multiple design options using AI becomes seamless. Our state-of-the-art technology enables you to showcase various furniture styles and layouts virtually—giving potential buyers or clients an immersive experience without lifting a finger. It's cost-effective, efficient, and guarantees jaw-dropping presentations every time."
            />

            <div className="grid grid-cols-2 gap-8 md:gap-6 md:flex md:flex-col sm:flex sm:flex-col">
              <ImgComparisonSlider>
                <img
                  className="h-full object-cover rounded-lg "
                  slot="first"
                  src={"/base2.png" || undefined}
                />
                <img
                  className="h-full object-cover rounded-lg"
                  slot="second"
                  src={"/large1.png" || undefined}
                />
              </ImgComparisonSlider>
              <ImgComparisonSlider>
                <img
                  className="h-full object-cover rounded-lg"
                  slot="first"
                  src={"/base2.png" || undefined}
                />
                <img
                  className="h-full object-cover rounded-lg"
                  slot="second"
                  src={"/large2.png" || undefined}
                />
              </ImgComparisonSlider>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div className="container mx-auto px-4 sm:px-6  ">
            <SectionHead
              heading="Photorealistic images for the best designs"
              paragraph="All the images generated by HouseKraft are of the highest quality. You can expect enhancements to your current image, and making sure that beauty and sophistication are in mind. Our images come out clean and will accurately reflect the details and nuances from the inputs provided. Whether you're working on architectural designs or interior spaces, HouseKraft will help bring out the best in your work with stunning accuracy and detail."
            />
            <div className="flex flex-col  gap-8 md:gap-6">
              <div className="relative rounded-lg shadow-xl overflow-hidden">
                <img
                  src={"/large1.png" || undefined}
                  alt="Architectural Design"
                  className=" hover:scale-105 transition duration-500 ease-in-out"
                />
              </div>
              <div className="relative rounded-lg shadow-xl overflow-hidden">
                <img
                  src={"/large2.png" || undefined}
                  alt="Architectural Design"
                  className=" hover:scale-105 transition duration-500 ease-in-out"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative py-20">
        <div className="container mx-auto px-4 sm:px-6  ">
          <SectionHead
            heading="Join the Future of Design Today!"
            paragraph="HouseKraft is revolutionizing interior and exterior design with AI-driven innovation. Don't miss out on this game-changing opportunity to elevate your creative capabilities while saving time and costs. Transform homes and buildings into breathtaking spaces tailored precisely to your client's desires—virtually stage projects effortlessly—and unlock a world of inspiration at your fingertips.
            Sign up for HouseKraft today and embark on an exciting journey towards redefining what's possible in architecture and interior design using AI!"
          />
        </div>
      </footer>
    </div>
  );
};
export default IndexComponent;

const SectionHead = ({
  heading,
  paragraph,
}: {
  heading: string;
  paragraph: string;
}) => {
  return (
    <div className="text-center">
      <h1
        className={`${cormorant.className}  text-6xl mb-4 font-medium sm:text-5xl`}
      >
        {heading}
      </h1>
      <p className="text-lg mb-16 font-thin font-sl opacity-60 w-[80%] m-auto sm:w-[100%]">
        {paragraph}
      </p>
    </div>
  );
};
