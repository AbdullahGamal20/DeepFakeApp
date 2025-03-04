"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

// Validation Schema using Yup
const validationSchema = Yup.object({
  fullname: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const ContactUs = () => {
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setServerResponse(null);
      setIsLoading(true);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
          values
        );

        setServerResponse("Your message has been sent successfully!");
        resetForm();
      } catch (error: any) {
        setServerResponse(
          error.response?.data?.message || "Failed to send message."
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <section className="text-white min-h-screen mt-10 py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-gray-300 text-lg mt-4 max-w-3xl mx-auto">
            Have questions or need support? Get in touch with our team. We’re
            here to help!
          </p>
        </div>

        {/* Contact Info & Form */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left - Contact Details & Map */}
          <div>
            <h2 className="text-2xl font-semibold text-[#1B3ECC] mb-4">
              Our Location
            </h2>
            <p className="text-gray-400 mb-4">
              We are located at Ain Shams University, Cairo, Egypt.
            </p>

            {/* Google Maps Embed */}
            <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.093056920963!2d31.279830675407807!3d30.07818261813168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f8f84b6db31%3A0xe287b03a8e376aba!2sAin%20Shams%20University!5e0!3m2!1sen!2seg!4v1707825412890!5m2!1sen!2seg"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <p className="text-gray-300">
                📍 Address: Ain Shams University, Cairo, Egypt
              </p>
              <p className="text-gray-300">📞 Phone: +20 123 456 7890</p>
              <p className="text-gray-300">📧 Email: support@realeye.com</p>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-[#1B3ECC] mb-4">
              Send Us a Message
            </h2>
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div>
                <label className="block text-white text-sm font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 mt-2 rounded-lg bg-gray-900 text-white focus:ring-1 focus:ring-[#D4C0F9] outline-none transition"
                  placeholder="Enter your name"
                  {...formik.getFieldProps("fullname")}
                />
                {formik.touched.fullname && formik.errors.fullname && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.fullname}
                  </p>
                )}
              </div>

              <div>
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
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-semibold">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 mt-2 rounded-lg bg-gray-900 text-white focus:ring-1 focus:ring-[#D4C0F9] outline-none transition"
                  placeholder="Type your message..."
                  {...formik.getFieldProps("message")}
                ></textarea>
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#234ff6] hover:bg-[#1B3ECC] transition-all ease-in-out duration-300 text-white py-3 rounded-lg font-semibold text-lg shadow-lg flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* Success or Error Message */}
            {serverResponse && (
              <p
                className={`text-center mt-4 ${
                  serverResponse.includes("failed")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {serverResponse}
              </p>
            )}
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <Link href="/home">
            <button className="border border-[#234ff6] text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-2 hover:bg-[#1B3ECC] transition">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
