"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Facebook, Github, Linkedin, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Validation Schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .min(4, "Username must be at least 4 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const page = () => {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setServerError("");
      setSuccessMessage("");

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
          {
            username: values.username,
            email: values.email,
            password: values.password,
          }
        );

        setSuccessMessage("Registration successful!");
        resetForm();

        router.push("/login");
      } catch (err: any) {
        setServerError(
          err.response?.data?.message ||
            "Registration failed. Please try again."
        );
      }
    },
  });

  return (
    <div className="h-[120vh] w-full flex flex-col items-center justify-center bg-black relative px-4">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-60"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute w-72 h-72 bg-[#234ff6] opacity-20 blur-[100px] rounded-full top-10 left-10 animate-slowpulse"></div>
        <div className="absolute w-72 h-72 bg-[#234ff6] opacity-20 blur-[100px] rounded-full bottom-10 right-10 animate-slowpulse"></div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-[90%] max-w-md bg-black bg-opacity-40 backdrop-blur-lg shadow-xl rounded-xl p-8 border border-[#1B3ECC]">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Create an Account
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Join us to detect deepfakes instantly.
        </p>

        {/* Error or Success Message */}
        {serverError && (
          <p className="text-red-500 text-center mb-4">{serverError}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        {/* Input Fields */}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="block text-white text-sm font-semibold">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 mt-2 rounded-lg bg-gray-900 text-white focus:ring-1 focus:ring-[#D4C0F9] outline-none transition"
              placeholder="Enter your username"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.username}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-white text-sm font-semibold">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 mt-2 rounded-lg bg-gray-900 text-white focus:ring-1 focus:ring-[#D4C0F9] outline-none transition"
              placeholder="Enter your email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-white text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 mt-2 rounded-lg bg-gray-900 text-white focus:ring-1 focus:ring-[#D4C0F9] outline-none transition"
              placeholder="Enter your password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 mt-2 rounded-lg bg-gray-900 text-white focus:ring-1 focus:ring-[#D4C0F9] outline-none transition"
              placeholder="Confirm your password"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Register Button with Spinner */}
          <button
            type="submit"
            className="w-full bg-[#234ff6] hover:bg-[#1B3ECC] transition-all text-white py-2 rounded-lg font-semibold text-lg shadow-lg flex justify-center items-center"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-2" /> Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <p>Already have an account?</p>
          <Link href="/login" className="hover:text-[#234ff6]">
            Login
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-5 flex items-center justify-center">
          <span className="w-1/3 border-t border-gray-600"></span>
          <p className="px-3 text-gray-400 text-sm">or sign up with</p>
          <span className="w-1/3 border-t border-gray-600"></span>
        </div>

        {/* Social Login */}
        <div className="mt-5 flex justify-center space-x-4">
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

export default page;
