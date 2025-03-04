import Image from "next/image";
import Logo from "../../assets/Real-Logo-edited.png"; // Ensure logo is in public folder

const AppFooter = () => {
  return (
    <footer className=" text-white relative z-50 h-[350px]">
      <div className=" mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center">
              <Image
                src={Logo}
                alt="Logo"
                width={100}
                height={100}
                className="mt-4"
              />
            </div>

            <p className="mx-auto mt-4 max-w-md text-center leading-relaxed lg:text-left">
              The Ultimate Deepfake Detection Platform.
            </p>
          </div>
        </div>
        <hr className="mb-2 mt-2" />
        <div className="">
          <p className=" text-center text-sm py-4">
            Copyright &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
