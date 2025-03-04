import Image from "next/image";
import Link from "next/link";
import DeepFake from "../../assets/deepfake.png";

const page = () => {
  return (
    <section className="relative md:h-[100vh] mt-20  py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h1 className="text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold mb-6">
            Deepfake Detection
          </h1>
          <p className="text-neutral-300 text-[16px] line-clamp-5 mb-6">
            Experience a cutting-edge AI-driven platform for detecting deepfakes
            with unparalleled accuracy. Simply upload an image or provide a
            link, and our advanced system will analyze pixel inconsistencies,
            metadata anomalies, and AI-generated artifacts to verify
            authenticity instantly.
          </p>
          <p className="text-neutral-300 text-md">
            Leveraging a multi-layer detection approach, our technology ensures
            a comprehensive analysis by examining image patterns, compression
            artifacts, and deep learning markers, helping you distinguish real
            content from manipulated media effortlessly.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <Link href="/login">
              <button className="w-full bg-[#234ff6] hover:bg-[#1B3ECC] transition-all text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
                Get Started
              </button>
            </Link>
            <Link href="/contact-us">
              <button className="border border-[#234ff6] text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-2 hover:bg-[#1B3ECC] transition">
                Talk to an expert <span>↗</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-[600px] md:h-[500px] flex justify-center relative border-2 border-[#777] rounded-[16px]">
          <div className="w-[320px] h-[230px] md:w-full md:h-[500px] p-1 ">
            <Image
              src={DeepFake}
              alt="Deepfake Detection UI"
              className="rounded-[16px] shadow-xl md:h-[485px] w-full "
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
