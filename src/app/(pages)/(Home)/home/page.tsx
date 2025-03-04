import React from "react";

import { ContainerScroll } from "@/app/_components/Global/ContainerScroll";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/app/_components/Global/InfiniteMovingCards";
import { clients, products } from "@/lib/constants";
import { HeroParallax } from "@/app/_components/Global/HeroScrollBar";
import { LampComponent } from "@/app/_components/Global/Lamp";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/app/_components/Global/3d-card";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import AppFooter from "@/app/_components/Footer/Footer";
const page = () => {
  return (
    <div className="">
      <section className="h-screen w-full  bg-neutral-950 rounded-md !overflow-visible relative flex flex-col items-center  antialiased">
        <div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
        <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center justify-center flex-col">
                <Button
                  size={"lg"}
                  className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit
                border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F]
                hover:bg-white group transition-all flex items-center
                justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500
                duration-500"
                >
                  <Link
                    href={"/login"}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black"
                  >
                    Start For Free Today
                  </Link>
                </Button>
                <h1 className="text-3xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold mb-10">
                  Detect Deepfakes Instantly with Real Eye
                </h1>
              </div>
            }
          />
        </div>
      </section>
      <InfiniteMovingCards
        className="md:mt-[34rem] mt-[100px]"
        items={clients}
        direction="right"
        speed="slow"
      />

      <section>
        <HeroParallax products={products} />
      </section>

      <section className="md:mt-[200px]">
        <LampComponent />
        <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8 -mt-72">
          <CardContainer className="px-3">
            <CardBody className="bg-black text-white relative group/card  hover:shadow-2xl hover:shadow-neutral-500/[0.1]  border-white/[0.2] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white "
              >
                Free
                <h2 className="text-6xl ">$0</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-sm max-w-sm mt-8 text-neutral-300"
              >
                Get a glimpse of what our software is capable of. Just a heads
                up {"you'll"} never leave us after this!
                <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon />3 Free automations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    100 tasks per month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Two-step Actions
                  </li>
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  <Link href={"/login"}>Try now →</Link>
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  <Link href={"/login"}>Get Started Now</Link>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          <CardContainer className=" px-3">
            <CardBody className="bg-black text-white relative group/card  hover:shadow-2xl hover:shadow-neutral-500/[0.1]  border-white/[0.2] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white "
              >
                Pro Plan
                <h2 className="text-6xl ">$29</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-sm max-w-sm mt-8 text-neutral-300"
              >
                Get a glimpse of what our software is capable of. Just a heads
                up you'll never leave us after this!
                <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    20 Free automations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    1000 tasks per month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Two-step Actions
                  </li>
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  <Link href={"/login"}>Try now →</Link>
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  <Link href={"/login"}>Get Started Now</Link>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </section>
    </div>
  );
};

export default page;
