"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./loader.css";
import Image from "next/image";
import Logo from "../../assets/Real-Logo-edited.png";
const Loader = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
      router.push("/home"); // Redirect to Home after loading
    }, 4000); // Adjust time as needed (2 seconds)
  }, [router]);

  if (!isLoading) return null; // Hide Loader after redirect

  return (
    <div className="loader-container">
      <div className="flex flex-col items-center">
        <span className="loader"></span>
        <Image
          src={Logo}
          alt="Logo"
          width={150}
          height={150}
          className="mt-5 loader"
        />
      </div>
    </div>
  );
};

export default Loader;
