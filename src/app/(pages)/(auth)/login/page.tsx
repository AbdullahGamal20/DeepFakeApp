"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Facebook, Github, Linkedin, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie

// Validation Schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setServerError("");

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
          {
            email: values.email,
            password: values.password,
          }
        );

        if (response.data.success) {
          // Store userID in cookies
          Cookies.set("userID", response.data.userID, { expires: 7 }); // Expires in 7 days
          Cookies.set("token", response.data.token, { expires: 7 });
          console.log("Login successful:", response.data);

          // Redirect to upload page
          router.push("/upload");
        }
      } catch (err: any) {
        setServerError(
          err.response?.data?.message || "Login failed. Please try again."
        );
      }
    },
  });

  return (
    <div className="h-[100vh] w-full relative flex items-center justify-center bg-black">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-60"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute w-72 h-72 bg-[#234ff6] opacity-20 blur-[100px] rounded-full top-14 left-14 animate-slowpulse"></div>
        <div className="absolute w-72 h-72 bg-[#234ff6] opacity-20 blur-[100px] rounded-full bottom-14 right-14 animate-slowpulse"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full md:mx-auto max-w-md bg-black bg-opacity-30 backdrop-blur-lg shadow-xl rounded-xl p-8 border border-[#1B3ECC]">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Sign in to detect deepfakes instantly.
        </p>

        {/* Error Message */}
        {serverError && (
          <p className="text-red-500 text-center mb-4">{serverError}</p>
        )}

        {/* Input Fields */}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 mt-2 rounded-lg bg-gray-900 text-white  outline-none transition"
              placeholder="Enter your email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 mt-2 rounded-lg bg-gray-900 text-white  outline-none transition"
              placeholder="Enter your password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Login Button with Spinner */}
          <button
            type="submit"
            className="w-full bg-[#234ff6] hover:bg-[#1B3ECC] transition-all text-white py-3 rounded-lg font-semibold text-lg shadow-lg flex justify-center items-center"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-2" /> Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <Link href="/forgot-password" className="hover:text-[#234ff6]">
            Forgot Password?
          </Link>
          <Link href="/register" className="hover:text-[#234ff6]">
            Create Account
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-center">
          <span className="w-1/3 border-t border-gray-600"></span>
          <p className="px-1 text-gray-400 text-sm">or continue with</p>
          <span className="w-1/3 border-t border-gray-600"></span>
        </div>

        {/* Social Login */}
        <div className="mt-6 flex justify-center space-x-4">
          <button className="bg-gray-900 p-3 rounded-full hover:bg-gray-800 transition">
            <Github className="text-white text-md" />
          </button>
          <button className="bg-gray-900 p-3 rounded-full hover:bg-gray-800 transition">
            <Facebook className="text-white text-md" />
          </button>
          <button className="bg-gray-900 p-3 rounded-full hover:bg-gray-800 transition">
            <Linkedin className="text-white text-md" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
