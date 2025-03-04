import React from "react";
import Image from "next/image";
import Aside from "@/app/_components/Aside/Aside";
import Link from "next/link";
import CaseOneImage from "../../assets/case_1.webp";
import CaseTwoImage from "../../assets/case_2.webp";
import CaseThirdImage from "../../assets/case_3.webp";
import CaseFourthImage from "../../assets/case_4.webp";
import CaseFifthImage from "../../assets/case_5.webp";

const page = () => {
  const cases = [
    {
      title: "Elliston Berry: AI-Generated Deepfake Harassment",
      description:
        "At just 14 years old, Elliston Berry became a victim of AI-generated deepfake nude images. These fabricated images, created from her social media photos, were circulated by classmates, causing severe emotional trauma.",
      imageUrl: CaseOneImage,
      source:
        "https://www.thetimes.co.uk/article/i-was-just-terrified-parents-battle-big-tech-over-ai-nudes-qmdvhc2wk",
    },
    {
      title: "Hyderabad Deepfake Blackmail Incident",
      description:
        "A 19-year-old student from Hyderabad, India, was blackmailed using deepfake technology. The accused used AI to create a nude deepfake image and attempted to extort money from the victim.",
      imageUrl: CaseTwoImage,
      source:
        "https://timesofindia.indiatimes.com/city/hyderabad/plaint-filed-over-deepfake-image-used-for-blackmail/articleshow/116481633.cms",
    },
    {
      title: "Singapore Public Servants Targeted by Deepfake Extortion",
      description:
        "Over 100 public servants in Singapore, including five ministers, were targeted in a deepfake extortion scheme. AI-generated compromising content was used to blackmail officials, highlighting the growing cyber threat.",
      imageUrl: CaseThirdImage,
      source:
        "https://www.scmp.com/week-asia/politics/article/3288671/deepfake-extortion-targets-singapore-officials-highlighting-growing-cyber-threat",
    },
    {
      title: "UK Soldier’s Deepfake Revenge Blackmail",
      description:
        "Jonathan Bates, a former Royal Air Force veteran, was sentenced to five years in prison for creating and distributing sexually explicit deepfake images of his ex-wife and three other women.",
      imageUrl: CaseFourthImage,
      source:
        "https://nypost.com/2025/01/02/world-news/uk-soldier-sentenced-to-prison-for-posting-sexually-explicit-deepfake-pics-of-women-on-porn-sites/",
    },
    {
      title: "South Korea’s Deepfake Telegram Scandal",
      description:
        "In South Korea, numerous teachers and female students became victims of deepfake images shared on Telegram. This incident sparked national outrage and prompted calls for stronger legal actions.",
      imageUrl: CaseFifthImage,
      source: "https://en.wikipedia.org/wiki/Deepfake_pornography",
    },
  ];

  return (
    <div className="flex h-screen bg-[#121212] text-white">
      <Aside />
      <section className="flex-1 overflow-y-auto py-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold mb-4">
            Knowledge Center
          </h1>
          <h1 className="text-4xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold mb-12">
            Real-Life Cases of Deepfake Harassment and Blackmail
          </h1>
          <div className="grid md:grid-cols-2 gap-12  ">
            {cases.map((caseItem, index) => (
              <div
                key={index}
                className="bg-[#121212] p-6 rounded-xl shadow-lg border-4 border-[#1E1E1E]"
              >
                <Image
                  src={caseItem.imageUrl}
                  alt={caseItem.title}
                  className="rounded-t-xl w-full h-[300px]"
                  loading="lazy"
                />
                <div className="my-4">
                  <Link
                    href={caseItem.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#fff] bg-[#1B3ECC] border-2 border-[#1B3ECC] hover:bg-transparent  px-6 py-2 rounded-lg transition-all duration-300 ease-in-out"
                  >
                    Read more
                  </Link>
                </div>
                <h3 className="text-2xl font-semibold text-white mt-4">
                  {caseItem.title}
                </h3>
                <p className="text-gray-400 mt-2 leading-relaxed">
                  {caseItem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
