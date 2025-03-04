import Aside from "@/app/_components/Aside/Aside";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What are the dangers of Deepfakes?",
      answer:
        "Deepfakes are AI-generated manipulations of videos, images, or audio that appear genuine. They can be used to spread misinformation, manipulate political opinions, and even pose threats to national security.",
    },
    {
      question: "How do Deepfakes spread misinformation?",
      answer:
        "Deepfakes can create highly convincing fake videos or images that may go viral on social media, leading to false narratives, reputation damage, and public deception.",
    },
    {
      question: "Can Deepfakes be used for harassment and blackmail?",
      answer:
        "Yes. Deepfakes can be weaponized to create explicit or compromising fake content used to harass or blackmail individuals, leading to severe psychological distress and reputation damage.",
    },
    {
      question: "How can victims of deepfake harassment seek help?",
      answer:
        "Victims should report the incident to law enforcement, seek legal counsel, and contact social media platforms to request content removal. Psychological support is also essential in handling emotional distress.",
    },
    {
      question: "What legal actions can be taken against deepfake blackmail?",
      answer:
        "Many countries are enacting laws to criminalize deepfake blackmail. Victims can file defamation, privacy violation, or cybercrime charges depending on local regulations.",
    },
    {
      question: "Can Deepfakes be used for cyberbullying?",
      answer:
        "Yes. Deepfakes can be misused to create malicious videos or images targeting individuals, leading to harassment, defamation, and psychological harm.",
    },
    {
      question: "How do Deepfakes impact political landscapes?",
      answer:
        "Fake videos or manipulated speeches of politicians can be used to sway public opinion, manipulate elections, and undermine democracy.",
    },
    {
      question: "Do Deepfakes pose a national security threat?",
      answer:
        "Yes. Manipulated media featuring government officials or military leaders can create confusion, disrupt national security, and impact international relations.",
    },
    {
      question: "How can we prevent the spread of Deepfakes?",
      answer:
        "Education, verification systems, and legal frameworks are key. Raising awareness, developing AI detection tools, and enforcing regulations can help mitigate the risks.",
    },

    {
      question:
        "How can individuals protect themselves from deepfake exploitation?",
      answer:
        "Avoid sharing sensitive personal content, enable privacy settings on social media, use digital watermarking for authenticity verification, and stay informed about emerging deepfake detection tools.",
    },
  ];

  return (
    <div className="flex h-screen bg-black text-white">
      <Aside />
      <section className="flex-1  overflow-y-auto py-10 px-6 md:px-16">
        <div className="max-w-4xl w-full mx-auto">
          <h1 className="text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold mb-12">
            Our Knowledge Center
          </h1>
          <div className="grid grid-cols-1 gap-10">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#121212] p-6 rounded-xl shadow-[0px_4px_10px_rgba(0,0,0,0.6),_0px_1px_3px_rgba(27,62,204,0.4)] border-2 border-[#1E1E1E]"
              >
                <h3 className="text-[26px] text-center text-gray-300 font-bold">
                  {faq.question}
                </h3>
                <p className="text-gray-400 mt-3 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
